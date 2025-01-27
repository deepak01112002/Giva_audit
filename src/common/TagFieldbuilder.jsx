import React from "react";
import CheckboxBuilder from "./CheckboxBuilder";
import InputBuilder from "./InputBuilder";
import RadioBuilder from "./RadioBuilder";
import SelectBuilder from "./SelectBuilder";

const TagFieldBuilder = (attributes) => {
    let tag ;
    switch(attributes.tag) {
        case "input":tag = <InputBuilder {...attributes}/>;
        break;
        case "select":tag=<SelectBuilder {...attributes}/>;
        break;
        case "radio":tag=<RadioBuilder {...attributes}/>;
        break;
        case "checkbox":tag=<CheckboxBuilder {...attributes}/>;
        break;
        default:tag=<InputBuilder {...attributes}/>
    }
    return tag;
    
}

export default TagFieldBuilder;