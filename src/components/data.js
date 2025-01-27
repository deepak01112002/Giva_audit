export const dummy  = {
    "status": "success",
    "isError": false,
    "data": [
        {
            "module": "configVersion"
        },
        {
            "_id": "641d169a37b2466b4f818bdb",
            "module": "multitabs_1",
            "project_code": "audit",
            "module_name": "Visit",
            "module_code": "audit_module",
            "module_icon": "http://product.infield.co.in:8080/api/docs/getmyfile/new_visit.png",
            "allow_designation": [
                "Moving Merchandiser-MM",
                "Resident Merchandiser-RM",
                "LAS"
            ],
            "configuration": {
                "multitab_screen": {
                    "is_dynamic_form_required": false,
                    "method": "get",
                    "host": "http://product.infield.co.in:8080",
                    "path": "/api/audit/getDynamicTicketConfig?",
                    "multitab_screencontent": [
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Audit Details",
                            "form_id": "audit_details",
                            "form_position": "1",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "depend_on": [],
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "content": [
                                {
                                    "label_key": "date_of_visit",
                                    "label": "Date of Visit",
                                    "value": "date",
                                    "value_type": "date",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label_key": "time_in",
                                    "label": "Time IN",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label_key": "time_out",
                                    "label": "Time Out",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label_key": "number_of_staff",
                                    "label": "Number of Staff",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label_key": "section_covered",
                                    "label": "Section Covered",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Diamond",
                                        "Gold",
                                        "Silver"
                                    ]
                                },
                                {
                                    "label_key": "name_of_product",
                                    "label": "Name of Product inquired",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Parking Area",
                            "form_id": "audit_parking_area",
                            "form_position": "2",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details"
                            ],
                            "content": [
                                {
                                    "label_key": "vehicle_name",
                                    "label": "Which vehicle the auditor take for the audit?",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label_key": "ample_space",
                                    "label": "Was there ample space for the parking?",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label_key": "parking_driver_present",
                                    "label": "When you entered the gate of the store, was there any Guard or the parking driver present? If yes, what was the name of the person?**",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label_key": "car_door_opened",
                                    "label": "Did the Guard or the parking driver open the car door for you?",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label_key": "parking_driver_asked_keys",
                                    "label": "Did the parking driver ask you to give him the keys and did he park the car for you?",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label_key": "parking_driver_greeted_you",
                                    "label": "Did the Guard or the parking driver greet you?",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label_key": "parking_driver_guided_you",
                                    "label": "Did the Guard or the parking driver guide you to the store?",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label_key": "parking_driver_brought_vehicle_back",
                                    "label": "After leaving the store, did the parking driver bring your vehicle back to you?",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label_key": "rate_parking",
                                    "label": "How was the parking service?(On a scale of 1 to 5)",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Entrance",
                            "form_id": "audit_entrance",
                            "form_position": "3",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area"
                            ],
                            "content": [
                                {
                                    "label": "Was there a security guard present at the entrance door?",
                                    "label_key": "security_guard_present",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the security guard open door for you and greet you?",
                                    "label_key": "security_guard_greeted",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the security guard well-groomed and in his uniform?",
                                    "label_key": "guard_well_groomed",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did you see any staff and did he/she acknowledge you within 30 seconds of your arrival?",
                                    "label_key": "staff_acknowledgement",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "If no, within how much time were you acknowledged?",
                                    "label_key": "staff_not_acknowledgement",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": false,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Did the customer relation executive or staff welome you and speak about Vimmidi?",
                                    "label_key": "staff_welcomed_you",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "How many customers were present when you entered the store?",
                                    "label_key": "no_of_customers",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": false,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "*Were you greeted by the staff? What were the greetings?",
                                    "label_key": "staff_greeted_you",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the customer relationship executive ask the purpose of the visit?",
                                    "label_key": "purpose_of_visit",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the customer relationship executive guide you to the jewellery counter?",
                                    "label_key": "executive_guided_you",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were you handed over to a Sales Associate?",
                                    "label_key": "handed_over_to_sales_associate",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the customer relationship executive tell the requirement mentioned by you to the sales associate?",
                                    "label_key": "requirement_conveyed_to_sales_associate",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were you given a comfortable space to sit and have discussion?",
                                    "label_key": "space_to_sit",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were you offered water or any beverage by the Sales Associate or any other staff member?",
                                    "label_key": "beverage_offered",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "How water or beverage were served?",
                                    "label_key": "beverage_served_on",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Was the customer relationship executive well-groomed and presentable ?",
                                    "label_key": "cre_groomed",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Rate the customer relationship executive. (On a scale of 1 to 5)",
                                    "label_key": "rate_cre",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Store Ambiance",
                            "form_id": "audit_store_ambiance",
                            "form_position": "4",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area",
                                "audit_entrance"
                            ],
                            "content": [
                                {
                                    "label": "Was the signboard clearly visible from outside?",
                                    "label_key": "sign_board_visible",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the signboard damage free and well maintained?",
                                    "label_key": "signboard_damage_free",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the entrance clean and dirt free?",
                                    "label_key": "entrance-clean",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were there advertising or promotional banners/material inside?",
                                    "label_key": "advertising_material_present",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the temperature well maintained and comfortable?",
                                    "label_key": "temp_well_maintained",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were pricing labels present on either products or the shelf?",
                                    "label_key": "pricing_lables_present",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the counter area organized and free of clutter?",
                                    "label_key": "counter_area_organized",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were there any boxes or inventory kept in front in a unattractive way?",
                                    "label_key": "inventory_in_unattractive_way",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the display area well arranged and tidy?",
                                    "label_key": "display_area_clean",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did you find any digital branding inside the store?",
                                    "label_key": "digital_branding_inside",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "How much would you rate the overall ambience and feel at the outlet? (On a scale of 1 to 5)",
                                    "label_key": "rate_ambiance",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Staff Knowledge And Service",
                            "form_id": "audit_staff_knowledge",
                            "form_position": "5",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area",
                                "audit_entrance",
                                "audit_store_ambiance"
                            ],
                            "content": [
                                {
                                    "label": "Did the sales associate introduce himself while beginning the conversation?",
                                    "label_key": "sales_associate_introduced",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the sales sassociate well-groomed and presentable ?",
                                    "label_key": "sales_associate_groomed",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the sales associate ask about your purpose of visit?",
                                    "label_key": "sales_associate_asked_purpose",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the sales associate ask for occasion of the purchase?",
                                    "label_key": "sales_associate_ask_occassion",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the sales associate ask for your preferred price range for products?",
                                    "label_key": "sales_associate_ask_range",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the sales associate ask for any specific design or pattern you are looking for?",
                                    "label_key": "sales_associate_ask_pattern",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "How was the jewellery displayed in front of you ?",
                                    "label_key": "jewellery_displayed",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Did the sales associate ask you to try-on the jewellery?",
                                    "label_key": "sales_associate_asked_you_to_try",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the sales associate tried to show new arrivals as well?",
                                    "label_key": "sales_associate_showed_new_arrivals",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the sales associate aware about ongoing offers and promotions?",
                                    "label_key": "sales_associate_aware_about_offers",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the sales associate paying full attention to you without any disturbance?",
                                    "label_key": "sales_associate_paying_attention",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the sales associate tried to upsell by recommending more ornaments which will suit your selected ones?",
                                    "label_key": "sales_associate_tried_to_upsell",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the sales associate mention the signature collection they have?",
                                    "label_key": "sales_associate_mentioned_signature_collection",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the sales associate show you the signature collection?",
                                    "label_key": "sales_associate_showed_signature_collection",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "When you ask for the most selling product, what was the reaction of the sales associate?",
                                    "label_key": "reaction_on_most_selling",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "*Any scheme was mention by the staff to you, like gold savings scheme?",
                                    "label_key": "scheme_mentioned",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "What was the discount offered by the sales associate?",
                                    "label_key": "discount_offered_by_sales_associate",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Was the store manager available? Did he interact with you?",
                                    "label_key": "store_manager_available",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the store manager well-groomed and presentable ?",
                                    "label_key": "store_manager_groomed",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "How much convincing did you find the sales associate? (On a scale of 1 to 5)",
                                    "label_key": "rate_sales_associate",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Rate the overall product/brand knowledge of the sales associate? (On a scale of 1 to 5)",
                                    "label_key": "overall_product_knowledge",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Brand Advocacy",
                            "form_id": "audit_brand_advocacy",
                            "form_position": "6",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area",
                                "audit_entrance",
                                "audit_store_ambiance",
                                "audit_staff_knowledge"
                            ],
                            "content": [
                                {
                                    "label": "Did the Sales Associate explain about USPs (Unique Selling Propositions) for VBJs products?",
                                    "label_key": "usps_check",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "If yes, how many USPs were explained?",
                                    "label_key": "no_of_usps",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Did the Sales Associate offer/introduce Savings Scheme?",
                                    "label_key": "saving_schema_introduced",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the Sales Associate take the initiative to upsell/cross sell, by introducing products from other counter",
                                    "label_key": "upsell_initiative",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "If yes, specify what products were suggested while up selling -",
                                    "label_key": "products_tried_to_upsell",
                                    "value": "ediitext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": false,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Did the Sales Associate explain about Creative Centre?(Mark NA if silver section is visited)",
                                    "label_key": "cc_explained",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "If yes, specify what was explained -",
                                    "label_key": "cc_explained_points",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Did the CRE/Sales Associate take your contact details?",
                                    "label_key": "contact_details_taken",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Product Presentation",
                            "form_id": "audit_product_presentation",
                            "form_position": "7",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area",
                                "audit_entrance",
                                "audit_store_ambiance",
                                "audit_staff_knowledge",
                                "audit_brand_advocacy"
                            ],
                            "content": [
                                {
                                    "label": "Did the Sales Associates take pride in being in VBJ and make you feel that you are experiencing a special product?",
                                    "label_key": "sales_associate_took_pride",
                                    "value": "dropdownmultiselect",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the Sales Associate offer you a chance to try the jewellery presented?",
                                    "label_key": "sales_associate_offer_trial",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Mark the things that the Sales Associate did while showing the product",
                                    "label_key": "sales_associate_actions_product",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Were the product presented to the customers neatly and with enthusiasm?",
                                    "label_key": "product_presented_with_interest",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were the product arranged neatly?",
                                    "label_key": "product_arranged_neatly",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were the in-stock products in a place to display immediately?",
                                    "label_key": "in_stock_in_display",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Does sales associate have knowledge about birth stones or other gem stones?",
                                    "label_key": "knowledge_about_stones",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was there any staff to support the sales associate attending you? (Support staff is supposed to assist the sales associate in bringing jewelery from different counters, keeping them back etc.)",
                                    "label_key": "support_staff_present",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "If yes, was the support staff proactive and attentive while assisting the sales associate?",
                                    "label_key": "support_staff_proactive",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Did you notice anything wrong with the behaviour of support staff?",
                                    "label_key": "wrong_behaviour",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "If yes, please specify -",
                                    "label_key": "wrong_behaviour_desc",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Collection Presentation",
                            "form_id": "audit_collection_presentation",
                            "form_position": "8",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area",
                                "audit_entrance",
                                "audit_store_ambiance",
                                "audit_staff_knowledge",
                                "audit_brand_advocacy",
                                "audit_product_presentation"
                            ],
                            "content": [
                                {
                                    "label": "Did the Sales Associate introduce you to any of VBJ Signature collections?(Mark NA if Gold / Silver section is visited)",
                                    "label_key": "vbj_signature_intro",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Please mention how the collections were introduced",
                                    "label_key": "collection_desc",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Did the Sales Associate introduce any other Unique products to you?",
                                    "label_key": "unique_products",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "If marked yes , please mention which products were shown to you",
                                    "label_key": "shown_products",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "In case you asked for products which were unavailable, how was this handled?",
                                    "label_key": "unavailable_products_handled",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Mark the query raised by you",
                                    "label_key": "query_by_you",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Handling Customer Inquiries/Objections",
                            "form_id": "audit_handling_customer_enquiries",
                            "form_position": "9",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area",
                                "audit_entrance",
                                "audit_store_ambiance",
                                "audit_staff_knowledge",
                                "audit_brand_advocacy",
                                "audit_product_presentation",
                                "audit_collection_presentation"
                            ],
                            "content": [
                                {
                                    "label": "Was the sales associate able to reply your query satisfactorily?",
                                    "label_key": "sales_ass_reply_satisfactory",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Specify what did the sales associate reply for your query",
                                    "label_key": "query_rply",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "If the Sales Associate agreed to give discount, mention the amount/percentage of discount given to you -",
                                    "label_key": "discount_given",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were you able to see the manager for your queries?",
                                    "label_key": "manager_visible",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was the Manager able to reply your query satisfactorily?",
                                    "label_key": "manager_rply_satisfactory",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Did the manager agree to give you any discount?",
                                    "label_key": "manager_agreed_discount",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was your send off by Customer Relationship Executive a happy note?",
                                    "label_key": "send_off_by_cre",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Covid-19 Safety Measures",
                            "form_id": "audit_covid_measures",
                            "form_position": "91",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area",
                                "audit_entrance",
                                "audit_store_ambiance",
                                "audit_staff_knowledge",
                                "audit_brand_advocacy",
                                "audit_product_presentation",
                                "audit_collection_presentation",
                                "audit_handling_customer_enquiries"
                            ],
                            "content": [
                                {
                                    "label": "Was Temperature Screening done at the entrance, during visit?",
                                    "label_key": "temp_screening_at_entrance",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Were all staff members wearing mask?",
                                    "label_key": "staff_wearing_mask",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "Was Sanitizer available and easily visible at entrance or inside Store?",
                                    "label_key": "sanitizer_available",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                }
                            ]
                        },
                        {
                            "need_gps": true,
                            "gps_level": "mandatory",
                            "form_name": "Overall Consumer Experience And Sentimental Feedback",
                            "form_id": "audit_overall_experience",
                            "form_position": "92",
                            "is_confirmation_dialog_required": true,
                            "is_dynamic_form": false,
                            "submit_url": {
                                "method": "post",
                                "host": "http://product.infield.co.in:8080",
                                "path": "/api/audit/submitTabData"
                            },
                            "depend_on": [
                                "audit_details",
                                "audit_parking_area",
                                "audit_entrance",
                                "audit_store_ambiance",
                                "audit_staff_knowledge",
                                "audit_brand_advocacy",
                                "audit_product_presentation",
                                "audit_collection_presentation",
                                "audit_handling_customer_enquiries",
                                "audit_covid_measures"
                            ],
                            "content": [
                                {
                                    "label": "How convinced were you to purchase the product based on staff behaviour and pitch? (On a scale of 1(lowest) to 5 (highest))",
                                    "label_key": "rate_staff_behaviour",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "How likely are you to return to this store for purchase of jewellery or any ornaments if needed? (On a scale of 1(lowest) to 5 (highest))",
                                    "label_key": "return_rate",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Would you like to buy the jewellers from the Vummidi Bangaru Jewellers?",
                                    "label_key": "like_to_buy",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "How likely are you to recommend this store to your family or friends for purchase of jewelry? (On a scale of 1(lowest) to 5 (highest))",
                                    "label_key": "recommend_rate",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                },
                                {
                                    "label": "Did you like to purchase anything from VBJ in future?",
                                    "label_key": "vbj_in_furntiure",
                                    "value": "dropdown",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ],
                                    "options": [
                                        "Yes",
                                        "No"
                                    ]
                                },
                                {
                                    "label": "If No,  what is the reason to not purchase anything from VBJ?",
                                    "label_key": "reason_for_no_purchase",
                                    "value": "edittext",
                                    "value_type": "string",
                                    "hint": "",
                                    "validation": [
                                        {
                                            "required_field": true,
                                            "phone": false,
                                            "email": false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }
    ],
    "error": null,
    "msg": "success"
}