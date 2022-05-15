import React, { useState, useEffect} from "react"
import { Button, Icon, Form, TextArea } from "semantic-ui-react";

function AddRemoveNew(props) {
    const [inputFields, setInputFields] = useState(props.value); 

    const addInputField = () => {
        setInputFields([...inputFields, {
            id: 0,
            vocValue: '',
        }])
    }

    const removeInputFields = (index) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    }

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
    }

    return (
        <div>
            {
                inputFields.map((data, index) => {
                    const { vocValue } = data;
                    return (
                        <Form.Group>
                            <Form.Field
                                onChange={(evnt) => handleChange(index, evnt)}
                                value={vocValue}
                                name={"vocValue"}
                                className={props.className}
                                placeholder={props.placeholder}
                                control={TextArea}
                                width={(inputFields.length !== 1) ? 14 : 16}
                                id={0}
                            />
                            {(inputFields.length !== 1) ?
                                <Form.Button
                                    icon
                                    color="red"
                                    onClick={() => removeInputFields(index)}
                                    style={{ width: "50px", height: "50px" }}
                                    width={2}
                                ><Icon name="close" /></Form.Button>
                                : ''
                            }
                        </Form.Group>
                    )
                })
            }
            <Button type="button" basic color='blue' onClick={addInputField}>Add New</Button>
        </div>
    )
}
export default AddRemoveNew