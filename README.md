# PacTab

Browser extension to open links in the same tab by URL match patterns.

## Installation

> Installing from the official extension stores is not yet supported.

Download the zip file from [Releases](https://github.com/z11i/PacTab/releases). Then you can import the extension to your browser of choice.

For Firefox, go to `about:addons`, click the gear icon and choose "Install Add-on From File...".

For Chrome/Edge, go to `chrome://extensions/`, toggle on `Developer mode`, and drag and drop the zip file.

## Use case

This extension is useful if you want to reuse the same tab for a certain set of links. For example, you may use Google a lot, over time, you have a lot of Google tabs laying around. You can configure PacTab to always open Google search tabs in an existing Google search tab.

Another example is, you may use Slack in your browser, and you don't want Slack links opened externally to open in another browser tab. They should always open in the one Slack tab.

## Configuration

You can configure the extension in the options page of the extension.

The extension takes a list of rules. Each rule has a target tab and a list of source tabs.

To match source tabs, you should use JavaScript regular expressions.

To match target tabs, you should use [match](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns) [patterns](https://developer.chrome.com/extensions/match_patterns).

### Example configuration

If you want to always reuse a Google search tab, use the following:

```
- Always use tabs that matches:
  https://www.google.com/*
  ...when new URLs match the following:
  - https://www.google.com/
```

If you want to always reuse a Slack tab, use the following:

```
- Always use tabs that matches:
  https://app.slack.com/*
  ...when new URLs match the following:
  - https://app.slack.com/
  - https://mycompany.slack.com/
```
