# dynamic-css-module

This is a function for dynamically creating CSS and optionally adding the CSS to an existing style object.

Use this function as follows:

addStyle(title, cssText)

title:  
Set this parameter to the title attribute of an existing style tag which the CSS should be added to.

Eg:
<style title="foo">
  .label{font-weight:bold}
</style>

<script>
addStyle("foo", ".label{font-weight:normal}")
</style>

The new style will be inserted at the bottom of the stylesheet overriding any existing matching rules.  In this example, the new CSS style is added to the stylesheet indicated by the title attribute(title="foo") and overrides the existing CSS rule.  Set the title attribute to blank string "" if not adding to an existing page style.

