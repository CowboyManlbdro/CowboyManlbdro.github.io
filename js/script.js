const questionnaires = document.querySelectorAll(".questionnaire__wrapper"),
    pacient = document.querySelector("#pacient"),
    modal = document.querySelector('.modal');

const today = document.querySelector('#today');
let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
today.textContent = output;

const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;
    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let name_p = getRandomIntInclusive(100,300);
let lastname = getRandomIntInclusive(100,300);
pacient.textContent = name_p + "" + lastname;

function blood_confirmed_1 (checkboxes) {
    let pcr = 0;
    let mkbi = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-type') == 'pcr') {
            if (checkbox.checked) {
                pcr = 1;
            }
        } else {
            if (checkbox.checked) {
                mkbi = 1;
            }
        }
    });

    if (pcr == 1 && mkbi == 1) {
        return 1;
    } else {
        return 0;
    }
}

function blood_confirmed_2 (checkboxes, clinic_correspondence, hirurg_correspondence) {
    let mkbi = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-type') == 'mkbi') {
            if (checkbox.checked) {
                mkbi += 1;
            }
        } 
    });

    if ((mkbi > 1) && (clinic_correspondence == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_confirmed_3 (checkboxes, clinic_correspondence, hirurg_correspondence) {
    let mkbi = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-type') == 'mkbi') {
            if (checkbox.checked) {
                mkbi += 1;
            }
        } 
    });

    if ((mkbi == 1) && (clinic_correspondence == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_confirmed_4 (checkboxes, clinic_correspondence, hirurg_correspondence) {
    let pcr = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-type') == 'pcr') {
            if (checkbox.checked) {
                pcr += 1;
            }
        } 
    });

    if ((pcr == 1) && (clinic_correspondence == 1) && (hirurg_correspondence == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_confirmed (checkboxes, clinic_correspondence, hirurg_correspondence) {
    if (blood_confirmed_1(checkboxes) || blood_confirmed_2(checkboxes, clinic_correspondence, hirurg_correspondence) || blood_confirmed_3(checkboxes, clinic_correspondence, hirurg_correspondence) || blood_confirmed_4(checkboxes, clinic_correspondence, hirurg_correspondence)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed_1_2_3 (checkboxes, clinic_correspondence) {
    let pcr_tkan = 0;
    let mkbi_tkan = 0;
    let pcr_blood = 0;
    let mkbi_blood = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-material') == 'blood') { 
            if (checkbox.getAttribute('data-type') == 'pcr') {
                if (checkbox.checked) {
                    pcr_blood = 1;
                }
            } else {
                if (checkbox.checked) {
                    mkbi_blood = 1;
                }
            }
        } else {
            if (checkbox.getAttribute('data-type') == 'pcr') {
                if (checkbox.checked) {
                    pcr_tkan = 1;
                }
            } else {
                if (checkbox.checked) {
                    mkbi_tkan = 1;
                }
            }
        }

    });
    let sum = pcr_tkan + mkbi_tkan + pcr_blood + mkbi_blood;
    if (sum >= 3) {
        return 1;
    } else {
        if (sum == 2) {
            if (clinic_correspondence == 1) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
}

function tkan_confirmed_4 (checkboxes, clinic_correspondence, hirurg_correspondence) {
    let pcr_tkan = 0;
    let mkbi_tkan = 0;
    let pcr_blood = 0;
    let mkbi_blood = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-material') == 'blood') { 
            if (checkbox.getAttribute('data-type') == 'pcr') {
                if (checkbox.checked) {
                    pcr_blood += 1;
                }
            } else {
                if (checkbox.checked) {
                    mkbi_blood += 1;
                }
            }
        } else {
            if (checkbox.getAttribute('data-type') == 'pcr') {
                if (checkbox.checked) {
                    pcr_tkan += 1;
                }
            } else {
                if (checkbox.checked) {
                    mkbi_tkan += 1;
                }
            }
        }

    });
    if (((pcr_tkan > 1) || (mkbi_tkan > 1) || (pcr_blood > 1) || (mkbi_blood > 1)) && (clinic_correspondence == 1) && (hirurg_correspondence == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed_5 (checkboxes, clinic_correspondence, hirurg_correspondence) {
    let pcr_tkan = 0;
    let mkbi_tkan = 0;
    let pcr_blood = 0;
    let mkbi_blood = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-material') == 'blood') { 
            if (checkbox.getAttribute('data-type') == 'pcr') {
                if (checkbox.checked) {
                    pcr_blood = 1;
                }
            } else {
                if (checkbox.checked) {
                    mkbi_blood = 1;
                }
            }
        } else {
            if (checkbox.getAttribute('data-type') == 'pcr') {
                if (checkbox.checked) {
                    pcr_tkan = 1;
                }
            } else {
                if (checkbox.checked) {
                    mkbi_tkan = 1;
                }
            }
        }

    });
    let sum = pcr_tkan + mkbi_tkan + pcr_blood + mkbi_blood;
    if ((sum == 1) && (clinic_correspondence == 1) && (hirurg_correspondence == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed (checkboxes, clinic_correspondence, hirurg_correspondence) {
    if (tkan_confirmed_1_2_3(checkboxes) || tkan_confirmed_4(checkboxes, clinic_correspondence, hirurg_correspondence) || tkan_confirmed_5(checkboxes, clinic_correspondence, hirurg_correspondence)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_exception_1 (checkboxes, clinic_correspondence, hirurg_correspondence) {
    let pcr = 0;
    let mkbi = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-type') == 'pcr') {
            if (checkbox.checked) {
                pcr += 1;
            }
        } 
        if (checkbox.getAttribute('data-type') == 'mkbi') {
            if (checkbox.checked) {
                mkbi += 1;
            }
        } 
    });

    if ((mkbi == 1) && (pcr == 0) && (clinic_correspondence == 0) && (hirurg_correspondence == 0)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_exception_4 (clinic_correspondence, hirurg_correspondence) {
    if ((clinic_correspondence == 0) && (hirurg_correspondence == 0)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_exception (checkboxes, clinic_correspondence, hirurg_correspondence) {
    if (checkboxes[0].getAttribute('data-exception') == 'true'){
        if (blood_exception_1(checkboxes, clinic_correspondence, hirurg_correspondence)) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (blood_exception_4(clinic_correspondence, hirurg_correspondence)) {
            return 1;
        } else {
            return 0;
        }
    }
}

function tkan_exception_1 (checkboxes, clinic_correspondence, hirurg_correspondence) {
    let pcr_tkan = 0;
    let mkbi_tkan = 0;
    let pcr_blood = 0;
    let mkbi_blood = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.getAttribute('data-material') == 'blood') { 
            if (checkbox.getAttribute('data-type') == 'pcr') {
                if (checkbox.checked) {
                    pcr_blood = 1;
                }
            } else {
                if (checkbox.checked) {
                    mkbi_blood = 1;
                }
            }
        } else {
            if (checkbox.getAttribute('data-type') == 'pcr') {
                if (checkbox.checked) {
                    pcr_tkan = 1;
                }
            } else {
                if (checkbox.checked) {
                    mkbi_tkan = 1;
                }
            }
        }

    });

    if (((mkbi_blood == 1) || (mkbi_tkan == 1)) && ((pcr_blood == 0) || (pcr_tkan == 0)) && (clinic_correspondence == 0)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_exception_4 (clinic_correspondence, hirurg_correspondence) {
    if ((clinic_correspondence == 0) && (hirurg_correspondence == 0)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_exception (checkboxes, clinic_correspondence, hirurg_correspondence) {
    if (checkboxes[0].getAttribute('data-exception') == 'true'){
        if (tkan_exception_1(checkboxes, clinic_correspondence, hirurg_correspondence)) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (tkan_exception_4(clinic_correspondence, hirurg_correspondence)) {
            return 1;
        } else {
            return 0;
        }
    }
}

function questionnaireSubmit() {

    let clinic_correspondence, hirurg_correspondence, blood, tkan, conclusion;

    if (document.querySelector('input[name="clinic_correspondence"]:checked') == null || document.querySelector('input[name="hirurg_correspondence"]:checked') == null) {
        conclusion = 'Выберите "соответствует" или "не соответствует" клиническая и хирургическая картины';
        let resultModal = document.getElementById("modal__body");
        resultModal.innerText = conclusion;

        fadeIn(modal,500);
        return 0;
    }

    clinic_correspondence = document.querySelector('input[name="clinic_correspondence"]:checked').value; 
    hirurg_correspondence = document.querySelector('input[name="hirurg_correspondence"]:checked').value;

    if (document.querySelector('#blood').checked) {
        blood = 1;
    } else {
        blood = 0;
    }

    if (document.querySelector('#tkan').checked) {
        tkan = 1;
    } else {
        tkan = 0;
    }

    const pathogens__check_clinic = document.querySelector('.pathogens__check_clinic');
    let check_pathogens = pathogens__check_clinic.querySelectorAll('.pathogen');

    let pathogens = [];
    check_pathogens.forEach((check_pathogen) => {
        pathogens.push(check_pathogen.textContent);
    });

    let confirmed = [];
    let unconfirmed = [];
    let result;
    
    for (let i = 0; i < pathogens.length; i++) {
        let checkboxes = document.querySelectorAll('input[value="' + pathogens[i] + '"]');
        if (blood && !tkan) {
            if (blood_confirmed(checkboxes, clinic_correspondence, hirurg_correspondence)) {
                confirmed.push(pathogens[i]);
            }
            if (blood_exception(checkboxes, clinic_correspondence, hirurg_correspondence)) {
                unconfirmed.push(pathogens[i]);
            }
        } else {
            if (tkan_confirmed(checkboxes, clinic_correspondence, hirurg_correspondence)) {
                confirmed.push(pathogens[i]);
            }
            if (tkan_exception(checkboxes, clinic_correspondence, hirurg_correspondence)) {
                unconfirmed.push(pathogens[i]);
            }
        }
    }

    conclusion = 'Подтвержденные возбудители:\n';
    for (let i = 0; i < confirmed.length; i++) { 
        conclusion += confirmed[i] + ' ';
    }

    conclusion += '\nИсключенные возбудители:\n';
    for (let i = 0; i < unconfirmed.length; i++) { 
        conclusion += unconfirmed[i] + ' ';
    }

    let resultModal = document.getElementById("modal__body");
    resultModal.innerText = conclusion;

    fadeIn(modal,500);
}

document
    .querySelector(".modal__btn-close")
    .addEventListener("click", () => fadeOut(modal,500));
document
    .querySelector(".close")
    .addEventListener("click", () => fadeOut(modal,500));


function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

const blood_check = document.querySelector("#blood");
const blood = document.querySelector(".blood");

blood_check.addEventListener('change', function () {
    if (this.checked) {
        fadeIn(blood,500);
    } else {
        fadeOut(blood,500);
    }
});

const tkan_check = document.querySelector("#tkan");
const tkan = document.querySelector(".tkan");

tkan_check.addEventListener('change', function () {
    if (this.checked) {
        fadeIn(tkan,500);
    } else {
        fadeOut(tkan,500);
    }
});

const pathogens__check_clinic = document.querySelector(".pathogens__check_clinic");
const pathogens__check_hirurg = document.querySelector(".pathogens__check_hirurg");
const clinic = document.querySelector(".clinic");
const hirurg = document.querySelector(".hirurg");

let array_pathogen = [];

function checkboxes_check (checkboxes) {
    let check = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            check = 1;
        }
    });

    return check;
}

function checkboxes_clear (checkboxes) {
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}

//работа с чекбоксами
const groups_item = document.querySelectorAll(".pathogen__group-item"); //берем все группы
groups_item.forEach((group_item) => {
    
    const checkboxes = group_item.querySelectorAll('input[type="checkbox"]');//находим в группе чекбоксы
    checkboxes.forEach((checkbox) => {

        //для каждого чекюокса вешаем событие изменения
        checkbox.addEventListener('change', function () {
            //если отмечаем чекбокс, то открываем блоки клиническую и хирургичекую картин, создаем элемент со значением чекбокса и помещаем этот элемент в эти блоки
            if (this.checked) {

                if (getComputedStyle(clinic).display == "none") {
                    fadeIn(clinic,500);
                    fadeIn(hirurg,500);
                }

                function new_pathogen_block(value, type) {
                    let pathogen_elem = document.createElement('div');
                    pathogen_elem.className = 'pathogen';
                    pathogen_elem.id = value + ' ' + type;
                    let pathogen_name = document.createTextNode(value);
                    pathogen_elem.append(pathogen_name);

                    pathogen_elem.addEventListener('click', function () {
                        let checkboxes_named_elem = document.querySelectorAll('input[value="' + value + '"]');
                        checkboxes_clear(checkboxes_named_elem);
                        this.remove();

                        if (type == 'clinic') {
                            document.getElementById(value + ' hirurg').remove();
                        } else {
                            document.getElementById(value + ' clinic').remove();
                        }

                        array_pathogen.splice(array_pathogen.indexOf(checkbox.value), 1);
                    });

                    return pathogen_elem;
                }

                if (!contains(array_pathogen, this.value)) {
                    array_pathogen.push(this.value);
                    pathogens__check_clinic.append(new_pathogen_block(this.value, 'clinic'));
                    pathogens__check_hirurg.append(new_pathogen_block(this.value, 'hirurg'));
                }
                
            } else {
                let checkboxes_named = document.querySelectorAll('input[value="' + this.value + '"]'); //массив всех чекбоксов с одинаковым значением
                //если убираем отметку, то проверяем остались ли отмеченные чекбоксы с одинаковым значением, если нет, то удаляем из картин элемент
                if (!checkboxes_check(checkboxes_named)) {
                    array_pathogen.splice(array_pathogen.indexOf(checkbox.value), 1);
                    document.getElementById(this.value + ' clinic').remove();
                    document.getElementById(this.value + ' hirurg').remove();
                    // checkboxes_clear(checkboxes_named);
                }
            }
        });
    });

    //раскрытие списков групп и подгрупп
    let group_title = group_item.querySelector(".group");
    group_title.addEventListener('click', function () {
        let subgroups_item = group_item.querySelectorAll(".pathogen__subgroup-item");
        
        subgroups_item.forEach((subgroup_item) => {
            let subgroup_title = subgroup_item.querySelector(".subgroup");
            
            subgroup_title.addEventListener('click', function () {
                let items = subgroup_item.querySelectorAll(".pathogen__item");
                items.forEach((item) => {
                    item.classList.toggle("pathogen__item_active");      
                });
            });

            if (subgroup_title.textContent == '') {
                subgroup_title.style.display = 'none';
                let items = subgroup_item.querySelectorAll(".pathogen__item");
                items.forEach((item) => {
                    item.classList.toggle("pathogen__item_active");    
                });
            }  

            subgroup_item.classList.toggle("pathogen__subgroup-item_active");
        });
    });
});

const add_btns = document.querySelectorAll('.add_pathogen_btn');
add_btns.forEach((btn) => {
    btn.addEventListener('click', function () {

        if (getComputedStyle(clinic).display == "none") {
            fadeIn(clinic,500);
            fadeIn(hirurg,500);
        }

        parent = btn.parentNode;
        input = parent.querySelector('input');
        new_pathogen = input.value;

        function new_pathogen_block(value, type) {
            let pathogen_elem = document.createElement('div');
            pathogen_elem.className = 'pathogen';
            pathogen_elem.id = value + ' ' + type;
            let pathogen_name = document.createTextNode(value);
            pathogen_elem.append(pathogen_name);

            pathogen_elem.addEventListener('click', function () {
                this.remove();

                if (type == 'clinic') {
                    document.getElementById(value + ' hirurg').remove();
                } else {
                    document.getElementById(value + ' clinic').remove();
                }
            });

            return pathogen_elem;
        }

        pathogens__check_clinic.append(new_pathogen_block(new_pathogen, 'clinic'));
        pathogens__check_hirurg.append(new_pathogen_block(new_pathogen, 'hirurg'));
    });
});
