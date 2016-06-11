
//dynamic css module

function addStyle(title, cssText)//title is the "title" attribute of the style tag this code is modifying
{
	var sheet = null;
	if(title!="")
	{
		//if a stylesheet title was specified, try to find it
		title = title.toLowerCase();
		if(document.styleSheets.length>0)
		{
			for(var i=0; i<document.styleSheets.length; i++)
			{
				if(document.styleSheets[i].title!=null)
				{
					if(document.styleSheets[i].title.toLowerCase() == title)
					{
						sheet = document.styleSheets[i];
						break;
					}
				}
			}
		}
	}

	if(sheet==null)//stylesheet object not found, create a new one
	{
		sheet = document.createElement("style");
		if(title=="")
			title = "title"+document.styleSheets.length;
		sheet.setAttribute("title", title);
		document.getElementsByTagName("head")[0].appendChild(sheet);

		//style dom object has been attached, get a handle to the stylesheet js object

		for(var i=0; i<document.styleSheets.length; i++)
		{
			if(document.styleSheets[i].title!=null)
			{
				if(document.styleSheets[i].title.toLowerCase() == title)
				{
					sheet = document.styleSheets[i];
					break;
				}
			}
		}

	}

	if(sheet==null)//stylesheet object not found or created, just bail
		return;

	if(sheet.sheet)
	 	sheet = sheet.sheet;
	else if(sheet.styleSheet)
		sheet = sheet.styleSheet;

	if(typeof sheet.insertRule != "undefined")
	{
		if(sheet.cssRules!=null)
		{
			if(sheet.cssRules.length!=null)
				sheet.insertRule(cssText, sheet.cssRules.length);
			else
				sheet.insertRule(cssText, 0);
		}
		else
			sheet.insertRule(cssText, 0);
    }
    else
	{ /* IE need to separate out into a selectors and a rule*/
		var selectors, selector, rule;
		cssText = cssText.replace(/\s*,\s*/,",");//remove spaces around commas
		selectors = cssText.replace(/\{[^\}]+\}/,"");
		rule = cssText.replace(selectors,"").replace(/\{|\}/g,"");
		selectors = selectors.split(",");

		for(var i=0;i<selectors.length;i++)
		{
			selector = selectors[i];
			if(sheet.rules!=null)
			{
				if(sheet.rules.length!=null)
				{
					sheet.addRule(selector, rule, sheet.rules.length);
				}
				else
					sheet.addRule(selector, rule, 0);
			}
			else
				sheet.addRule(selector, rule, 0);
		}
    }

	return title;
}