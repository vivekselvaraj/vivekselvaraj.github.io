// swift-tools-version:5.2

import PackageDescription

let package = Package(
    name: "VivekselvarajGithubIo",
    products: [
        .executable(
            name: "VivekselvarajGithubIo",
            targets: ["VivekselvarajGithubIo"]
        )
    ],
    dependencies: [
        .package(name: "Publish", url: "https://github.com/johnsundell/publish.git", from: "0.6.0")
    ],
    targets: [
        .target(
            name: "VivekselvarajGithubIo",
            dependencies: ["Publish"]
        )
    ]
)