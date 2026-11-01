export const workspace = [
  ["/docs", "docs/README.md", "Overview", "Start here"],
  ["/docs/getting-started", "docs/getting-started.md", "Getting started", "Start here"],
  ["/docs/usage", "docs/usage.md", "Workspace usage", "Start here"],
  ["/docs/configuration", "docs/configuration.md", "Configuration", "Workspace"],
  ["/docs/architecture", "docs/architecture.md", "Architecture", "Workspace"],
  ["/docs/troubleshooting", "docs/troubleshooting.md", "Troubleshooting", "Workspace"],
  ["/docs/development", "docs/development.md", "Development", "Project"],
  ["/docs/releases", "docs/releases.md", "Releases and deployment", "Project"],
] as const;

export const members = {
  slipway: [
    ["getting-started", "Installation"], ["usage", "Command reference"],
    ["configuration", "Configuration"], ["architecture", "Architecture"],
    ["troubleshooting", "Troubleshooting"], ["development", "Development"],
    ["releases", "Releases"], ["provenance", "Upstream provenance"],
  ],
  porthole: [
    ["getting-started", "Installation"], ["usage", "Session monitor"],
    ["configuration", "Configuration"], ["architecture", "Architecture"],
    ["troubleshooting", "Troubleshooting"], ["development", "Development"],
    ["releases", "Releases"], ["provenance", "Upstream provenance"],
  ],
} as const;
