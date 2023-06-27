$(document).ready(() => {
    console.log("jQuery is ready!");
    //jQuery version used
    console.log(`jQuery ${$().jquery}`);
    
    //Element selector
    $("#ordered li").text("recursion");
    //ID selector
    $("#title").text("Hello, jQuery!");
    //Class selector
    $(".class-time").text("15:00");
    //Attribute selector
    $("p[lang='es']").text("Hello!");

    //Filter selector
    /*
        `:first`
        `:last`
        `:even`
        `:odd`
        `:eq(index)`
        `:gt(index)` = greater than (index)
        `:lt(index)` = less than (index)
    */
    $("#ordered li:odd").text("Well, I am odd...");
    //Descendant selector (of a child/grandchild/etc...)
    $("body p:eq(1)").text("Bonjour!");
    //Immediate child selector (ONLY selects children, not great/grand/etc...)
    $("#ordered ol > li:last-child").text("I'm the oldest child!");
    
    //Multiple selector
    $("#ordered li:first-child, #title").text("Recursion, but pathogenic?");

    //All (wildcard) selector (w/ find), HOWEVER, is generally advised against as very slow (unless by itself)
    //Visibility filtering (w/ `filter("visible")`)
    let tags = []
    let elements = $("body").find("*").filter(":visible");
    for(let i = 0; i < elements.length; i++) {
        tags.push(elements[i].tagName)
    }
    $("#ids").text(tags.join(" | "));

    /*
    Visibility filtering only works with elements that occupy no space of the viewport, for example by:
        - `display:none`
        - `width:0;height:0`
    NOT by:
        - `opacity:0%`
        - `visibility:hidden`
    As they RESERVE PAGE SPACE, nonetheless
    */

    /*
    Optimisations:
        1. Always select by ID if possible
        2. Select a CLASS with its closest parent ELEMENT
        3. Use SIMPLICITY, remember ID takes precedence, so unnecessary for any selectors beforehand (to the left)
        4. Selectors are loaded from RIGHT to LEFT, i.e. if there is an ID, then use an ID selector, then using `.find(...)` to match further selection
        5. Select only ONCE, use CHAINING on the same jQuery obj. by DOT NOTATION, or simply store the obj. in a VARIABLE to be reused 
    */

    //Each traversal
    $("#ordered li").each(function(index) {
        $(this).text(`${$(this).text()} | ${index.toString()}`);
    });

    let orderedItem = $("#ordered li");
    //Reference traversal
    orderedItem.first().text("I'm first!");
    orderedItem.last().text("I'm last?");

    //DOM tree traversal
    orderedItem.first().next().text("And I'm next!");
    let before = orderedItem.last().prev();
    before.text(`${before.html()} And previous?`);

    let unorderedItem = $("#unordered li");
    //All tree traversal
    unorderedItem.first().nextAll().text("All the above, except first");
    unorderedItem.first().nextUntil(unorderedItem.last()).text("In-between");

    orderedList = orderedItem.parent();
    //Relative traversal
    orderedList.children().text("Child");
    orderedList.siblings("#unordered").children().text("Sibling");

    //Parent traversal
    //`$("body").parent()` returns `document`, yet `$("body").parents` returns an empty set
    tags = []
    let family = orderedList.parents()
    for(let i = 0; i < family.length; i++) {
        let parent = family[i]
        tags.push(parent.tagName);
    }
    $("#family").text(tags.join(" | "));

    unorderedList = unorderedItem.parent();
    //Interrogating
    let imposter = $(".imposter").eq(0);
    //$("li").has("span").text("An imposter!")
    if(unorderedList.has(imposter)) {
        unorderedList.find(imposter).text("Imposter!")
    }

    //Not interrogating
    //We can use either the element/ID/tag/etc... or the jQuery selector obj. for interrogating with is/has/not
    if(unorderedList.not("ol")) {
        console.log("Not an ordered list!");
    }

    //Style interrogation
    imposter.text(`${imposter.html()} @${imposter.css("color")}`);

    //Styling
    $("#title").css("backgroundColor", "#F0F0FF");
    orderedList.css({
        "color": "#00FF00",
        "fontStyle": "italic"
    });

    let paragraph = $("p");
    //Adding/removing (style) classes to jQuery selectors on having condition
    //space-delimited
    if(paragraph.hasClass("under-the-sea")) {
        paragraph.removeClass("under-the-sea")
    } else {
        paragraph.addClass("under-the-sea");
    }
    //Toggling (style) classes
    //`paragraph.toggleClass("under-the-sea")`
    
    //Chained class change
    paragraph.removeClass("under-the-sea").addClass("in-the-sky");

    let box = $("#box");
    //Interrogating sizes (excluding margin, and padding)
    //`.width()` and `.height()` return integers, whereas `.css("width")` and `.css("height")` will return as a string of len. of pixels -> "...px"
    const resolution = [box.width(), box.height()]
    $("#resolution").text(resolution.map(n => Math.floor(n).toString()).join("x"));

    /*
        `.innerWidth()` returns `width + padding-left + padding-right`
        `.innerHeight()` returns `height + padding-top + padding-bottom`
        `.outerWidth()` returns `.innerWidth() + margin-left + margin-right`
        `.outerHeight()` returns `.innerHeight() + margin-top + margin-bottom`
    */

    //Interrogating margin (using `inner`, and `outer` resolution)
    const boxMarginWidth = box.outerWidth() - box.innerWidth();
    const boxMarginHeight = box.outerHeight() - box.innerHeight();
    console.log(boxMarginWidth, boxMarginHeight);

    //For interrogating VIEWPORT resolution: $("window")
    //For interrogating DOCUMENT resolution: $("document")

    //Retrieving text input 
    let textInputs = $("#text-form input[type='text']");
    let firstName = $(textInputs).eq(0).val();
    let surname = $(textInputs).eq(1).val();
    $("#box #hello").text(`Hello, ${firstName} ${surname}`)

    //Retrieving/setting text area
    let content = $("#textarea-form textarea[name='content']");
    content.val("Value... (for now)");
    console.log(content.val());

    //Properties
    //Always set the `.prop()` for the arg. as false rather than using `.removeProp()`, as cannot be set again for the session
    textInputs.eq(1).prop("disabled", true);
    console.log(textInputs.eq(1).prop("disabled"));

    /*
        `.prop()` to get and set DISABLED and CHECKED property values
        `.val()` to get and set all OTHER ATTRIBUTE values
    */
    
    //Radio checking (property)
    let radioInputs = $("#radio-form input[type='radio'");
    radioInputs.eq(2).prop("checked", true);
    console.log(radioInputs.eq(2).prop("checked"));

    //Checkbox checking (property)
    let checkboxInputs = $("#checkbox-form input[type='checkbox']");
    checkboxInputs.eq(1).prop("checked", true);
    console.log(checkboxInputs.eq(1).prop("checked"));

    //Option selection (property)
    let options = $("#option-form option");
    options.eq(1).prop("selected", true);
    if(options.eq(1).prop("selected") == true) {
        $("#option-selection").text(`Selected: ${options.eq(1).val().toUpperCase()}`);
    }
    $("#option-form select").change(() => {
        let choice = options.filter(":selected").val();
        $("#option-selection").text(`Selected: ${choice.toUpperCase()}`);
        
        //Less efficient alternate method, using `each`
        /*
        options.each((index) => {
            let option = options.eq(index);
            if(option.prop("selected") == true) {
                let choice = option.text();
                $("#option-selection").text(`Selected: ${choice.toUpperCase()}`);
            }
        });
        */
    });

    //Button interrogation
    let buttonInputs = $("#button-form button, #button-form input[type='button']")
    buttonInputs.css({
        "color": "#FFFFFF",
        "backgroundColor": "#000000",
        "border": "none"
    });
    console.log(buttonInputs.length);

    //File selection
    let fileInput = $("#file-form input[type='file']");
    fileInput.change(function() {
        let filepath = $(this).val();
        $("#file-selection").text(filepath);
    });

    //Image selection
    let imageInput = $("#image-form input[type='image']");
    imageInput.val("Duck");
    $("#image-value").text(imageInput.val());

    //Focus
    textInputs.focus(function() {
        $(this).css("opacity", "100%");
    });
    textInputs.blur(function () {
        $(this).css("opacity", "50%");
    })

    //Focus-in
    box.focusin(function() {
        $(this).css("border", "2px dashed white");
    });
    box.focusout(function() {
        $(this).css("border", "none");
    });

    //Submitting forms
    let fileForm = fileInput.parent();
    fileForm.submit(function(e) {
        console.log(e);
        return confirm("Submit?")
    });

    //Attributes
    imageInput.attr("width", "200px");
    //imageInput.removeAttr("width");
    
    //Adding content
    /*
        `before`, `after`, `prepend`, `append`
        `insertBefore`, `insertAfter`, `prependTo`, `appendTo`
    */

    //After
    $("#title").after("<h2>Subtitle</h2>")
    //Before
    orderedList.before("<p>Relative</p>")
    let accomplice = imposter.next().before("<li>Accomplice</li>")
    accomplice.attr("class", "imposter");
    //Append
    unorderedList.append("<li>Another one</li>")
    //Prepend (to)
    $("<li>Oldest sister</li>").prependTo(unorderedList);

    //Wrap
    imageInput.wrap("<div></div>");
    let duckBox = imageInput.parent();
    duckBox.attr("id", "duck-box");
    duckBox.css({
        "width": "100%",
        "backgroundColor": "#FF00FF",
        "textAlign": "center"
    });
    //Unwrap
    //imageInput.unwrap("<div></div>");
    //WrapAll
    orderedItem.wrapAll("<div></div>");
    let orderedBox = orderedList.children().eq(0);
    orderedBox.attr("class", "cell");
    //WrapInner
    //`unorderedItem` requires update, as the state of the elements it should contain has changed
    unorderedItem = unorderedList.children();
    unorderedItem.wrapInner("<div></div>");
    unorderedBox = unorderedItem.children();
    unorderedBox.attr("class", "cell");

    //Replace
    let list = orderedList.replaceWith(`<ul>${orderedList.html()}<ul>`);
    //$("<li>Copy...</li>").replaceAll($("li"));

    //Clone
    $("ul").after(list.clone());
});
//jQuery.noConflict() -> removes shortcut of `$`; instead using a direct call to `jQuery(...)`