/**
RequireJS is used for lazy loading of resources as well as dependency resolution.
**/

require(['knockout',
  'ojs/ojarraydataprovider',
  'ojs/ojdeferreddataprovider',
  'ojs/ojinputtext',
  'ojs/ojknockout',
  'ojs/ojbutton',
  'ojs/ojdialog',
  'ojs/ojlistview',
  'ojs/ojlistitemlayout',
  'ojs/ojnavigationlist',
  'ojs/ojmenu', 
  'ojs/ojoption',
  'ojs/ojswitcher'
], function(ko, ArrayDataProvider, DeferredDataProvider) {
  'use strict';

  let ViewModel = function() {

    let self = this;

    const NEW_TASK_DIALOG = document.getElementById('newTaskDialog');
    self.DATE_FORMATTER  = new Intl.DateTimeFormat([], {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit'
    });

    self.TaskModel = function() {
      let taskObject = {};
      taskObject.title = self.newTaskName();
      taskObject.date = new Date().toISOString();
      return taskObject;
    }

    self.newTaskName = ko.observable();
    self.newTaskDialogOpenAction = () => {
      self.newTaskName('New Task');
      NEW_TASK_DIALOG.open();
      document.getElementById('newTaskNameInputText|input').focus();
      document.getElementById('newTaskNameInputText|input').select();
    }

    self.newTaskButtonAction = function (event, data, bindingContext) {
      if (event.detail.originalEvent.key === "Enter" || event.type === 'ojAction') {
        console.log('Enter key pressed?');
      }

      console.log('New Task event listener');
      console.log(new Date());
      let newTask = new self.TaskModel();
      self.taskObservableArray.unshift(newTask);
      console.log(newTask);
      NEW_TASK_DIALOG.close();
    }
    
    self.savePending = function() {
      console.log('Saving pending tasks');
      const pendingArray = ko.toJSON(self.taskObservableArray);
      console.log(pendingArray);
      localStorage.setItem('pending', pendingArray);
    }

    self.saveComplete = () => {
      console.log('Saving complete tasks');
      const completeArray = ko.toJSON(self.completeObservableArray);
      console.log(completeArray);
      localStorage.setItem('complete', completeArray);
    }

    self.taskObservableArray = ko.observableArray([]);
    self.completeObservableArray = ko.observableArray([]);
    self.pendingDP = new ArrayDataProvider(self.taskObservableArray, { keyAttributes: 'date' });
    self.completedDP = new ArrayDataProvider(self.completeObservableArray, { keyAttributes: 'date' });

    self.taskObservableArray.subscribe(() => {
      self.savePending();
    });

    self.completeObservableArray.subscribe(() => {
      self.saveComplete();
    })

    if (localStorage.getItem('pending')) {
      self.taskObservableArray(JSON.parse(localStorage.getItem('pending')));
    }
    if (localStorage.getItem('complete')) {
      self.completeObservableArray(JSON.parse(localStorage.getItem('complete')));
    }

    self.onClickEventListener = function(event, data, bindingContext) {
      console.log(event);
      console.log(data);
      console.log(bindingContext);
    }

    self.reorderListener = function() {
      alert('Reorder coming soon!');
    }

    // Context Menu
    let menuLaunchedFrom = null;
    self.myActionFunction = (event) => {
      if (!menuLaunchedFrom) {
        console.error('Menu launch error. Item ID null');
        return;
      }
      const menuItem = event.detail.selectedValue;
      if (menuItem === 'complete') {
        let completedItem = null;
        self.taskObservableArray.remove((item) => {
          if (item.date === menuLaunchedFrom) {
            completedItem = item;
            return true;
          }
        });
        self.completeObservableArray.unshift(completedItem);
      } else if (menuItem === 'delete') {
        self.taskObservableArray.remove((item) => {
          return item.date === menuLaunchedFrom;
        });
        self.completeObservableArray.remove((item) => {
          return item.date === menuLaunchedFrom;
        });
      } else if (menuItem === 'notdone') {
        let undoneItem = null;
        self.completeObservableArray.remove((item) => {
          if (item.date === menuLaunchedFrom) {
            undoneItem = item;
            return true;
          }
        });
        self.taskObservableArray.unshift(undoneItem);
      }
    };

    self.myBeforeOpenFunction = (event) => {
      const target = event.detail.originalEvent.target;
      const context = document.getElementById("pendingListView").getContextByNode(target);
      if (context != null) {
        // console.log('launched from: - ' + context.key);
        menuLaunchedFrom = context.key;
      }
    };

    // Tab bar
    self.selectedTab = ko.observable('pending');
    self.tabListener = function (event) {
      let tabValue = event.detail.value;
      if (tabValue === "pending") {

      } else {

      }

    }

    /* self.dataProvider = new DeferredDataProvider(new Promise((resolve) => {
      fetch("https://apex.oracle.com/pls/apex/oraclejet/emp/")
        .then(response => response.json())
        .then(data => {
          const tempArray = data.items.map(item => {
            return {
              empno: item.empno,
              ename: item.ename,
              job: item.job,
              hiredate: item.hiredate,
              sal: item.sal
            };
          })
          resolve(new ArrayDataProvider(tempArray, {
            keyAttributes: 'empno'
          }))
        })
    })); */
  };

  ko.applyBindings(new ViewModel(), document.getElementById('wrapper'));

});


// CDN configuration for lading base JET libraries and resources
function _getCDNPath(paths) {
  var cdnPath = "https://static.oracle.com/cdn/jet/";
  var ojPath = "11.1.0/default/js/";
  var thirdpartyPath = "11.1.0/3rdparty/";
  var keys = Object.keys(paths);
  var newPaths = {};

  function _isoj(key) {
    return (key.indexOf('oj') === 0 && key !== 'ojdnd');
  }
  keys.forEach(function(key) {
    newPaths[key] = cdnPath + (_isoj(key) ? ojPath : thirdpartyPath) + paths[key];
  });
  return newPaths;
}

requirejs.config({
  paths: _getCDNPath({
    'knockout': 'knockout/knockout-3.5.1',
    'preact': 'preact/dist/preact.umd',
    'jquery': 'jquery/jquery-3.6.0.min',
    'jqueryui-amd': 'jquery/jqueryui-amd-1.12.1.min',
    'ojs': 'min',
    'ojL10n': 'ojL10n',
    'ojtranslations': 'resources',
    'signals': 'js-signals/signals.min',
    'text': 'require/text',
    'hammerjs': 'hammer/hammer-2.0.8.min',
    'ojdnd': 'dnd-polyfill/dnd-polyfill-1.0.2.min',
    'touchr': 'touchr/touchr'
  })
});

