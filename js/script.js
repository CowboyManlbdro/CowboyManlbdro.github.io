const questionnaires = document.querySelectorAll(".questionnaire__wrapper"),
    pacient = document.querySelector("#pacient"),
    modal = document.querySelector('.modal_result'),
    modal_therapy = document.querySelector('.modal_therapy');

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

const typical_group_pathogens = ['Haemophilus sp.', 'Aggregatibacter sp. (ранее Actinobacillus sp.)', 'Cardiobacterium sp.', 'Eikenella sp.', 'Kingella sp.'];
const typical_pathogens = ['Streptococcus cristatus', 'Streptococcus gordonii', 'Streptococcus mitis', 'Streptococcus pneumoniae', 'Streptococcus sanguis', 'Streptococcus bovis (Streptococcus gallolyticus)', 'Haemophilus sp.', 'Aggregatibacter sp. (ранее Actinobacillus sp.)', 'Cardiobacterium sp.', 'Eikenella sp.', 'Kingella sp.', 'Staphylococcus aureus MSSA', 'Staphylococcus aureus MRSA', 'Enterococcus faecalis', 'Streptococcus oralis'];

// const unconfirmed_group_pathogens = ['Corynebacterium sp.', 'Bacillus sp.'];
// const unconfirmed_subgroup_pathogens = ['Staphylococcus CONS','Streptococcus viridans','Propionibacterium acnes'];

function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

function blood_confirmed_1 (pathogen) {
    if (pathogen.getAttribute('data-blood-pcr') == 1 && pathogen.getAttribute('data-blood-mkbi') == 1) {
        return 1;
    } else {
        return 0;
    }
}

function blood_confirmed_2 (pathogen) {
    if ((pathogen.getAttribute('data-blood-mkbi') == 1) && (pathogen.getAttribute('data-probs') == 2) && (pathogen.getAttribute('data-corresponds') == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_confirmed_3 (pathogen) {
    if ((pathogen.getAttribute('data-blood-mkbi') == 1) && (pathogen.getAttribute('data-blood-pcr') != 1) && (pathogen.getAttribute('data-probs') == 1) && ((contains(typical_group_pathogens, pathogen.getAttribute('data-group'))) || (contains(typical_pathogens, pathogen.textContent)) || (contains(typical_group_pathogens, pathogen.textContent))) && (pathogen.getAttribute('data-corresponds') == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_confirmed_4 (pathogen) {
    if ((pathogen.getAttribute('data-blood-pcr') == 1) && (pathogen.getAttribute('data-blood-mkbi') == 0) && (pathogen.getAttribute('data-corresponds') == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_confirmed (pathogen) {
    if (blood_confirmed_1(pathogen) || blood_confirmed_2(pathogen) || blood_confirmed_3(pathogen) || blood_confirmed_4(pathogen)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed_1 (pathogen) {
    if ((pathogen.getAttribute('data-blood-pcr') == 1) && (pathogen.getAttribute('data-blood-mkbi') == 1) && (pathogen.getAttribute('data-tkan-mkbi') == 1) && (pathogen.getAttribute('data-tkan-pcr') == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed_2 (pathogen) {
    if ((+pathogen.getAttribute('data-blood-pcr') + +pathogen.getAttribute('data-blood-mkbi') + +pathogen.getAttribute('data-tkan-mkbi') + +pathogen.getAttribute('data-tkan-pcr')) == 3) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed_3 (pathogen) {
    if (((+pathogen.getAttribute('data-blood-pcr') + +pathogen.getAttribute('data-blood-mkbi') + +pathogen.getAttribute('data-tkan-mkbi') + +pathogen.getAttribute('data-tkan-pcr')) == 2) && (pathogen.getAttribute('data-corresponds') == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed_4 (pathogen) {
    let check_mkbi = false;
    if (pathogen.getAttribute('data-blood-mkbi') == 1) {
        check_mkbi = true;
    }

    let sum = +pathogen.getAttribute('data-blood-pcr') + +pathogen.getAttribute('data-blood-mkbi') + +pathogen.getAttribute('data-tkan-mkbi') + +pathogen.getAttribute('data-tkan-pcr');

    if ((((check_mkbi) && (sum == 1) && (pathogen.getAttribute('data-probs') == 2)) || ((!check_mkbi) && (sum == 1))) && (pathogen.getAttribute('data-corresponds') == 1) && (document.getElementById(pathogen.textContent +' hirurg').getAttribute('data-corresponds') == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed_5 (pathogen) {
    if ((+pathogen.getAttribute('data-blood-pcr') + +pathogen.getAttribute('data-blood-mkbi') + +pathogen.getAttribute('data-tkan-mkbi') + +pathogen.getAttribute('data-tkan-mkbi') == 1) && ((contains(typical_group_pathogens, pathogen.getAttribute('data-group'))) || (contains(typical_pathogens, pathogen.textContent)) || (contains(typical_group_pathogens, pathogen.textContent))) && (pathogen.getAttribute('data-corresponds') == 1) && (document.getElementById(pathogen.textContent +' hirurg').getAttribute('data-corresponds') == 1)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_confirmed (pathogen) {
    if (tkan_confirmed_1(pathogen) || tkan_confirmed_2(pathogen) || tkan_confirmed_3(pathogen) || tkan_confirmed_4(pathogen) || tkan_confirmed_5(pathogen)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_exception_1 (pathogen) {
    if ((pathogen.getAttribute('data-exception') == true) && (pathogen.getAttribute('data-blood-mkbi') == 1) && (pathogen.getAttribute('data-probs') == 1) && (pathogen.getAttribute('data-blood-pcr') == 0) && (pathogen.getAttribute('data-corresponds') == 0)) {
        return 1;
    } else {
        return 0;
    }
}

function blood_exception_2 (pathogen, pathogens) {
    if ((pathogen.getAttribute('data-exception') == true) && (pathogen.getAttribute('data-blood-mkbi') == 1) && (pathogen.getAttribute('data-blood-pcr') == 0)) {

        for (let i = 0; i < pathogens.length; i++) {
            if ((pathogens[i].getAttribute('data-blood-pcr') == 1)) {
                return 1;
            }
        }
        return 0;
    } else {
        return 0;
    }
}

function blood_exception_3 (pathogen, pathogens) {
    if ((pathogen.getAttribute('data-exception') == true) && (pathogen.getAttribute('data-blood-mkbi') == 0) && (pathogen.getAttribute('data-blood-pcr') == 1)) {
        for (let i = 0; i < pathogens.length; i++) {
            if ((pathogens[i].getAttribute('data-blood-mkbi') == 1) && ((contains(typical_group_pathogens, pathogens[i].getAttribute('data-group'))) || (contains(typical_pathogens, pathogens[i].textContent)) || (contains(typical_group_pathogens, pathogens[i].textContent)))) {
                return 1;
            }
        }
        return 0;
    } else {
        return 0;
    }
}

function blood_exception_4 (pathogen) {
    if (pathogen.getAttribute('data-corresponds') == 0) {
        return 1;
    } else {
        return 0;
    }
}

function blood_exception (pathogen, pathogens) {
    if (blood_exception_1(pathogen) || blood_exception_2(pathogen, pathogens) || blood_exception_3(pathogen, pathogens) || blood_exception_4(pathogen)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_exception_1 (pathogen) {
    if (((pathogen.getAttribute('data-blood-mkbi') == 1) || (pathogen.getAttribute('data-tkan-mkbi') == 1)) && ((pathogen.getAttribute('data-blood-pcr') == 0) || (pathogen.getAttribute('data-tkan-pcr') == 0)) && (pathogen.getAttribute('data-corresponds') == 0)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_exception_2 (pathogen, pathogens) {
    if ((pathogen.getAttribute('data-exception') == true) && ((pathogen.getAttribute('data-blood-mkbi') == 1) || (pathogen.getAttribute('data-tkan-mkbi') == 1)) && (pathogen.getAttribute('data-blood-pcr') == 0) && (pathogen.getAttribute('data-tkan-pcr') == 0)) {

        for (let i = 0; i < pathogens.length; i++) {
            if (((pathogens[i].getAttribute('data-blood-mkbi') == 1) || (pathogens[i].getAttribute('data-blood-pcr') == 1) || (pathogens[i].getAttribute('data-tkan-pcr') == 1) || (pathogens[i].getAttribute('data-tkan-mkbi') == 1)) && ((contains(typical_group_pathogens, pathogens[i].getAttribute('data-group'))) || (contains(typical_pathogens, pathogens[i].textContent)) || (contains(typical_group_pathogens, pathogens[i].textContent)))) {
                return 1;
            }
        }
        return 0;
    } else {
        return 0;
    }
}

function tkan_exception_3 (pathogen, pathogens) {
    if ((pathogen.getAttribute('data-exception') == true) && ((pathogen.getAttribute('data-blood-pcr') == 1) || (pathogen.getAttribute('data-tkan-pcr') == 1)) && (pathogen.getAttribute('data-blood-mkbi') == 0) && (pathogen.getAttribute('data-tkan-mkbi') == 0)) {

        for (let i = 0; i < pathogens.length; i++) {
            if (((pathogens[i].getAttribute('data-blood-mkbi') == 1) || (pathogens[i].getAttribute('data-tkan-mkbi') == 1)) && (pathogens[i].getAttribute('data-blood-pcr') == 0) && (pathogens[i].getAttribute('data-tkan-pcr') == 0) && ((contains(typical_group_pathogens, pathogens[i].getAttribute('data-group'))) || (contains(typical_pathogens, pathogens[i].textContent)) || (contains(typical_group_pathogens, pathogens[i].textContent)))) {
                return 1;
            }
        }
        return 0;
    } else {
        return 0;
    }
}

function tkan_exception_4 (pathogen) {
    if ((pathogen.getAttribute('data-corresponds') == 0) && (document.getElementById(pathogen.textContent +' hirurg').getAttribute('data-corresponds') == 0)) {
        return 1;
    } else {
        return 0;
    }
}

function tkan_exception (pathogen, pathogens) {
    if (tkan_exception_1(pathogen) || tkan_exception_2(pathogen, pathogens) || tkan_exception_3(pathogen, pathogens) || tkan_exception_4(pathogen)) {
        return 1;
    } else {
        return 0;
    }
}

const protez_klapan = document.querySelector('#protez_klapan');
const native_klapan = document.querySelector('#native_klapan');

protez_klapan.addEventListener('change', function () {
    if (this.checked) {
        fadeIn(document.querySelector('.protez'), 500);
        fadeOut(document.querySelector('.native'), 500);
        document.querySelectorAll('.native input').forEach((elem) => {
            elem.checked = false;
        });
    } else {
        fadeOut(document.querySelector('.protez'), 500);
    }
});

native_klapan.addEventListener('change', function () {
    if (this.checked) {
        fadeIn(document.querySelector('.native'), 500);
        fadeOut(document.querySelector('.protez'), 500);
        document.querySelectorAll('.protez input').forEach((elem) => {
            elem.checked = false;
        });
    } else {
        fadeOut(document.querySelector('.native'), 500);
    }
});

function questionnaireSubmit() {

    document.querySelectorAll('.therapy_display').forEach((elem) => {
        elem.style.display = 'none';
    });

    let blood, tkan, conclusion;

    if (document.querySelector('input[name="klapan"]:checked') == null) {
        conclusion = 'Выберете тип клапана';
        let resultModal = document.getElementById("modal__body");
        resultModal.innerText = conclusion;
        document.querySelector('.modal__btn-therapy').disabled = true;
        fadeIn(modal,500);
        return 0;
    }

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

    const pathogens = pathogens__check_clinic.querySelectorAll('.pathogen');

    let confirmed = [];
    let unconfirmed = [];
    
    for (let i = 0; i < pathogens.length; i++) {
        if (blood && !tkan) {
            if (blood_confirmed(pathogens[i])) {
                confirmed.push(pathogens[i]);
            }
            if (blood_exception(pathogens[i], pathogens)) {
                unconfirmed.push(pathogens[i]);
            }
        } else {
            if (tkan_confirmed(pathogens[i])) {
                confirmed.push(pathogens[i]);
            }
            if (tkan_exception(pathogens[i], pathogens)) {
                unconfirmed.push(pathogens[i]);
            }
        }
    }

    conclusion = 'Подтвержденные возбудители:\n';
    if (confirmed.length == 0) {
        conclusion += 'Отсутствуют';
    } else {
        for (let i = 0; i < confirmed.length; i++) { 
            conclusion += confirmed[i].textContent + ' ';
        }
    }


    conclusion += '\nИсключенные возбудители:\n';
    if (unconfirmed.length == 0) {
        conclusion += 'Отсутствуют';
    } else {
        for (let i = 0; i < unconfirmed.length; i++) { 
            conclusion += unconfirmed[i].textContent + ' ';
        }
    }

    for (let j = 0; j < unconfirmed.length; j++) { 
        if (contains(confirmed, unconfirmed[j])) {
            let index = confirmed.indexOf(unconfirmed[j]);
            confirmed.splice(index, 1);
        }
    }

    conclusion += '\nИтог:\n';
    for (let i = 0; i < confirmed.length; i++) { 
        conclusion += confirmed[i].textContent + ' ';
    }

    let resultModal = document.getElementById("modal__body");
    resultModal.innerText = conclusion;

    document.querySelector('.modal__btn-therapy').disabled = false;
    let klapan, protez, local, psycho;
    protez = null;
    local = null;
    psycho = null;

    klapan = document.querySelector('input[name="klapan"]:checked').value;

    if (document.querySelector('input[name="protez"]:checked') != null) {
        protez = document.querySelector('input[name="protez"]:checked').value;
    }

    if (document.querySelector('input[name="local"]:checked') != null) {
        local = document.querySelector('input[name="local"]:checked').value;
    }

    if (document.querySelector('input[name="psychoactive"]:checked') != null) {
        psycho = document.querySelector('input[name="psychoactive"]:checked').value;
    }

    
    if (confirmed.length == 0) {
        let therapy_array = [];
        if (protez != null) {
            if (protez == 'late') {
                if (!contains(therapy_array, 'late_protez')) {
                    therapy_array.push('late_protez');
                    document.getElementById('therapy_late_protez').style.display = 'block';
                }
            }
    
            if (protez == 'early') {
                if (!contains(therapy_array, 'early_protez')) {
                    therapy_array.push('early_protez');
                    document.getElementById('therapy_early_protez').style.display = 'block';
                }
            }
        } else {
            document.getElementById('therapy_late_protez').style.display = 'block';
            document.getElementById('therapy_early_protez').style.display = 'block';
        }

    } else {
        for (let i = 0; i < confirmed.length; i++) { 
            let therapy_array = [];
            if ((confirmed[i].getAttribute('data-subgroup') == 'Streptococcus viridans') || confirmed[i].textContent == 'Streptococcus bovis (Streptococcus gallolyticus)') {
                if (!contains(therapy_array, 1) && !contains(therapy_array, 2)) {
                    therapy_array.push(1);
                    therapy_array.push(2);
                    document.getElementById('therapy_1').style.display = 'block';
                    document.getElementById('therapy_2').style.display = 'block';
                }
            }

            if (confirmed[i].textContent == 'Streptococcus pneumoniae') {
                if (!contains(therapy_array, 3)) {
                    therapy_array.push(3);
                    document.getElementById('therapy_3').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-group') == 'Streptococcus sp.' && ((confirmed[i].textContent != 'Streptococcus pneumoniae' && confirmed[i].textContent != 'Streptococcus bovis (Streptococcus gallolyticus)' && confirmed[i].getAttribute('data-subgroup') != 'Streptococcus viridans') || (confirmed[i].getAttribute('data-subgroup') == 'other'))) {
                if (!contains(therapy_array, 4)) {
                    therapy_array.push(4);
                    document.getElementById('therapy_4').style.display = 'block';
                }
            }

            if (klapan == 'native' && local == 'left' && confirmed[i].textContent == 'Staphylococcus aureus MSSA') {
                if (!contains(therapy_array, 'MSSA')) {
                    therapy_array.push('MSSA');
                    document.getElementById('therapy_MSSA').style.display = 'block';
                }
            }

            if (klapan == 'native' && local == 'left' && confirmed[i].textContent == 'Staphylococcus aureus MRSA') {
                if (!contains(therapy_array, 'MRSA')) {
                    therapy_array.push('MRSA');
                    document.getElementById('therapy_MRSA').style.display = 'block';
                }
            }

            if ((confirmed[i].getAttribute('data-subgroup') == 'Staphylococcus CONS') || (confirmed[i].getAttribute('data-group') == 'Staphylococcus sp.' && confirmed[i].getAttribute('data-subgroup') == 'other')) {
                if (!contains(therapy_array, 7)) {
                    therapy_array.push(7);
                    document.getElementById('therapy_7').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-group') == 'Диплококки') {
                if (!contains(therapy_array, 'late_protez')) {
                    therapy_array.push('late_protez');
                    document.getElementById('therapy_late_protez').style.display = 'block';
                }

                if (!contains(therapy_array, 'early_protez')) {
                    therapy_array.push('early_protez');
                    document.getElementById('therapy_early_protez').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-group') == 'Corynebacterium sp.') {
                if (!contains(therapy_array, 'late_protez')) {
                    therapy_array.push('late_protez');
                    document.getElementById('therapy_late_protez').style.display = 'block';
                }

                if (!contains(therapy_array, 'early_protez')) {
                    therapy_array.push('early_protez');
                    document.getElementById('therapy_early_protez').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-group') == 'Other') {
                if (!contains(therapy_array, 'late_protez')) {
                    therapy_array.push('late_protez');
                    document.getElementById('therapy_late_protez').style.display = 'block';
                }

                if (!contains(therapy_array, 'early_protez')) {
                    therapy_array.push('early_protez');
                    document.getElementById('therapy_early_protez').style.display = 'block';
                }
            }

            if (klapan == 'protez' && confirmed[i].textContent == 'Staphylococcus aureus MSSA') {
                if (!contains(therapy_array, 'protez_MSSA')) {
                    therapy_array.push('protez_MSSA');
                    document.getElementById('therapy_protez_MSSA').style.display = 'block';
                }
            }

            if (klapan == 'protez' && confirmed[i].textContent == 'Staphylococcus aureus MRSA') {
                if (!contains(therapy_array, 'protez_MRSA')) {
                    therapy_array.push('protez_MRSA');
                    document.getElementById('therapy_protez_MRSA').style.display = 'block';
                }
            }

            if (klapan == 'native' && local == 'right' && confirmed[i].getAttribute('data-subgroup') == 'Staphylococcus aureus') {
                if (!contains(therapy_array, 8)) {
                    therapy_array.push(8);
                    document.getElementById('therapy_8').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-group') == 'Enterococcus sp.') {
                if (!contains(therapy_array, 9)) {
                    therapy_array.push(9);
                    document.getElementById('therapy_9').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-group') == 'HACEK') {
                if (!contains(therapy_array, 10)) {
                    therapy_array.push(10);
                    document.getElementById('therapy_10').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-group') == 'Не-HACEK Палочковидные бактерии') {
                if (!contains(therapy_array, 11)) {
                    therapy_array.push(11);
                    document.getElementById('therapy_11').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-subgroup') == 'Candida sp.') {
                if (!contains(therapy_array, 'Candida')) {
                    therapy_array.push('Candida');
                    document.getElementById('therapy_Candida').style.display = 'block';
                }
            }

            if (confirmed[i].getAttribute('data-subgroup') == 'Aspergillus sp.') {
                if (!contains(therapy_array, 'Aspergillus')) {
                    therapy_array.push('Aspergillus');
                    document.getElementById('therapy_Aspergillus').style.display = 'block';
                }
            }

            if (confirmed[i].textContent == 'Brucella sp.') {
                if (!contains(therapy_array, 'Brucella')) {
                    therapy_array.push('Brucella');
                    document.getElementById('therapy_Brucella').style.display = 'block';
                }
            }

            if (confirmed[i].textContent == 'Coxiella burnetii') {
                if (!contains(therapy_array, 'burnetii')) {
                    therapy_array.push('burnetii');
                    document.getElementById('therapy_burnetii').style.display = 'block';
                }
            }

            if (confirmed[i].textContent == 'Bartonella sp.') {
                if (!contains(therapy_array, 'Bartonella')) {
                    therapy_array.push('Bartonella');
                    document.getElementById('therapy_Bartonella').style.display = 'block';
                }
            }

            if (confirmed[i].textContent == 'Mycoplasma sp.') {
                if (!contains(therapy_array, 'Mycoplasma')) {
                    therapy_array.push('Mycoplasma');
                    document.getElementById('therapy_Mycoplasma').style.display = 'block';
                }
            }

            if (confirmed[i].textContent == 'Tropheryma whipplei') {
                if (!contains(therapy_array, 'whipplei')) {
                    therapy_array.push('whipplei');
                    document.getElementById('therapy_whipplei').style.display = 'block';
                }
            }

            // if (protez == 'late') {
            //     if (!contains(therapy_array, 'late_protez')) {
            //         therapy_array.push('late_protez');
            //         document.getElementById('therapy_late_protez').style.display = 'block';
            //     }
            // }

            // if (protez == 'early') {
            //     if (!contains(therapy_array, 'early_protez')) {
            //         therapy_array.push('early_protez');
            //         document.getElementById('therapy_early_protez').style.display = 'block';
            //     }
            // }

            if (therapy_array.length == 0) {
                if (!contains(therapy_array, 'default')) {
                    therapy_array.push('default');
                    document.getElementById('default').style.display = 'block';
                }
            }
        }
    }

    fadeIn(modal,500);
}

document.querySelector('.modal__btn-therapy').addEventListener('click', function () {
    fadeIn(modal_therapy,500);
});

document
    .querySelector(".modal__btn-therapy-close")
    .addEventListener("click", () => fadeOut(modal_therapy,500));

document
    .querySelector(".modal_therapy_close")
    .addEventListener("click", () => fadeOut(modal_therapy,500));

document
    .querySelector(".modal__btn-close")
    .addEventListener("click", () => fadeOut(modal,500));
document
    .querySelector(".close")
    .addEventListener("click", () => fadeOut(modal,500));




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

function update_pathogen_block(update_element_value, data_attr_material, data_attr_type) {
    update_element_clinic = document.getElementById(update_element_value + ' ' + 'clinic');
    update_element_hirurg = document.getElementById(update_element_value + ' ' + 'hirurg');
    update_element_clinic.setAttribute('data-'+data_attr_material, 1);
    update_element_hirurg.setAttribute('data-'+data_attr_material, 1);
    update_element_clinic.setAttribute('data-'+data_attr_material+'-'+data_attr_type, 1);
    update_element_hirurg.setAttribute('data-'+data_attr_material+'-'+data_attr_type, 1);
}

function del_pathogen_block(update_element_value, data_attr_material, data_attr_type, what_update) {
    update_element_clinic = document.getElementById(update_element_value + ' ' + 'clinic');
    update_element_hirurg = document.getElementById(update_element_value + ' ' + 'hirurg');

    if (what_update == 'material') {
        update_element_clinic.setAttribute('data-'+data_attr_material, 0);
        update_element_hirurg.setAttribute('data-'+data_attr_material, 0);
    } else {
        update_element_clinic.setAttribute('data-'+data_attr_material+'-'+data_attr_type, 0);
        update_element_hirurg.setAttribute('data-'+data_attr_material+'-'+data_attr_type, 0);
    }

}

const clears = document.querySelectorAll('.clear');
clears.forEach((clear) => {
    clear.addEventListener('click', function() {
        let input_value, material, type;
        clear.parentNode.querySelectorAll('input').forEach((input) => {
            input.checked = false;
            input_value = input.value;
            material = input.getAttribute('data-material');
            type = input.getAttribute('data-type');
        });

        if (this.classList.contains('clear_none_pathogen')) {
            return 0;
        }

        let data_material_check = document.querySelectorAll('input[data-material="' + material + '"][value="' + input_value + '"]');
        if (!checkboxes_check(data_material_check)) {
            del_pathogen_block(input_value, material, type, 'material');
        }

        let data_type_check = document.querySelectorAll('input[data-type="' + type + '"][value="' + input_value + '"]');
        if (!checkboxes_check(data_type_check)) {
            del_pathogen_block(input_value, material, type, 'type');
        }

        let checkboxes_named = document.querySelectorAll('input[type="checkbox"][value="' + input_value + '"]');
        if (!checkboxes_check(checkboxes_named)) {
            document.getElementById(input_value + ' clinic').remove();
            document.getElementById(input_value + ' hirurg').remove();
            array_pathogen.splice(array_pathogen.indexOf(input_value), 1);
        }

        this.style.display = 'none';
    });
});

function new_pathogen_block(value, type_picture, material, research, group, subgroup, probs = 1, type_input = 'checkbox', exception = false, non_typical = false) {
    let pathogen_elem = document.createElement('div');
    pathogen_elem.className = 'pathogen pathogen_not_corresponds';
    pathogen_elem.id = value + ' ' + type_picture;
    pathogen_elem.title = 'Нажмите, чтобы подтвердить соответсвие клинической картине';
    pathogen_elem.setAttribute('data-corresponds', 0);
    let pathogen_name = document.createTextNode(value);
    pathogen_elem.append(pathogen_name);
    pathogen_elem.setAttribute('data-'+ material, 1);
    pathogen_elem.setAttribute('data-'+ material + '-' + research, 1);
    // pathogen_elem.setAttribute('data-material', material);
    // pathogen_elem.setAttribute('data-type', research);
    pathogen_elem.setAttribute('data-group', group);
    pathogen_elem.setAttribute('data-subgroup', subgroup);
    pathogen_elem.setAttribute('data-type-picture', type_picture);
    if (type_input == 'radio') {
        pathogen_elem.setAttribute('data-probs', probs);
    }
    pathogen_elem.setAttribute('data-exception', exception);
    pathogen_elem.setAttribute('data-non-typical', non_typical);

    pathogen_elem.addEventListener('click', function () {

        if (this.classList.contains('pathogen_not_corresponds')) {
            this.classList.remove('pathogen_not_corresponds');
            this.classList.add('pathogen_corresponds');
            this.title = 'Нажмите, чтобы убрать соответсвие клинической картине';
            this.setAttribute('data-corresponds', 1);
        } else {
            this.classList.remove('pathogen_corresponds');
            this.classList.add('pathogen_not_corresponds');
            this.title = 'Нажмите, чтобы подтвердить соответсвие клинической картине';
            this.setAttribute('data-corresponds', 0);
        }
    });

    return pathogen_elem;
}



//работа с чекбоксами
const groups_item = document.querySelectorAll(".pathogen__group-item"); //берем все группы
groups_item.forEach((group_item) => {

    const radios = group_item.querySelectorAll('input[type="radio"]');

    radios.forEach((radio) => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                if (getComputedStyle(clinic).display == "none") {
                    fadeIn(clinic,500);
                }

                if (getComputedStyle(hirurg).display == "none") {
                    if (tkan_check.checked) {
                        fadeIn(hirurg,500);
                    }
                }

                this.parentNode.parentNode.querySelector('.clear').style.display = 'block';

                if (this.classList.contains('input_none_pathogen')) {
                    return 0;
                }

                if (!contains(array_pathogen, this.value)) {
                    array_pathogen.push(this.value);
                    pathogens__check_clinic.append(new_pathogen_block(this.value, 'clinic', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), this.getAttribute('data-probs'), 'radio', this.getAttribute('data-exception')));
                    pathogens__check_hirurg.append(new_pathogen_block(this.value, 'hirurg', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), this.getAttribute('data-probs'), 'radio', this.getAttribute('data-exception')));
                } else {
                    document.getElementById(this.value + ' ' + 'clinic').setAttribute('data-probs', this.getAttribute('data-probs'));
                    document.getElementById(this.value + ' ' + 'hirurg').setAttribute('data-probs', this.getAttribute('data-probs'));
                    update_pathogen_block(this.value, this.getAttribute('data-material'),this.getAttribute('data-type'));
                }
            }
        });
    });

    
    const checkboxes = group_item.querySelectorAll('input[type="checkbox"]');//находим в группе чекбоксы
    checkboxes.forEach((checkbox) => {
        //для каждого чекюокса вешаем событие изменения
        checkbox.addEventListener('change', function () {
            //если отмечаем чекбокс, то открываем блоки клиническую и хирургичекую картин, создаем элемент со значением чекбокса и помещаем этот элемент в эти блоки
            if (this.checked) {
                if (getComputedStyle(clinic).display == "none") {
                    fadeIn(clinic,500);
                }

                if (getComputedStyle(hirurg).display == "none") {
                    if (tkan_check.checked) {
                        fadeIn(hirurg,500);
                    }
                }

                if (this.classList.contains('input_none_pathogen')) {
                    return 0;
                }

                if (!contains(array_pathogen, this.value)) {
                    array_pathogen.push(this.value);
                    pathogens__check_clinic.append(new_pathogen_block(this.value, 'clinic', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), 1, 'checkbox', this.getAttribute('data-exception')));
                    pathogens__check_hirurg.append(new_pathogen_block(this.value, 'hirurg', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), 1, 'checkbox', this.getAttribute('data-exception')));
                } else {
                    update_pathogen_block(this.value, this.getAttribute('data-material'),this.getAttribute('data-type'));
                }
                
            } else {

                if (this.classList.contains('input_none_pathogen')) {
                    return 0;
                }

                let data_material_check = document.querySelectorAll('input[data-material="' + this.getAttribute('data-material') + '"][value="' + this.value + '"]');
                del_pathogen_block(this.value, this.getAttribute('data-material'), this.getAttribute('data-type'), 'type');

                if (!checkboxes_check(data_material_check)) {
                    del_pathogen_block(this.value, this.getAttribute('data-material'), this.getAttribute('data-type'), 'material');
                }

                let checkboxes_named = document.querySelectorAll('input[value="' + this.value + '"]'); //массив всех чекбоксов с одинаковым значением
                //если убираем отметку, то проверяем остались ли отмеченные чекбоксы с одинаковым значением, если нет, то удаляем из картин элемент
                if (!checkboxes_check(checkboxes_named)) {
                    array_pathogen.splice(array_pathogen.indexOf(checkbox.value), 1);
                    document.getElementById(this.value + ' clinic').remove();
                    document.getElementById(this.value + ' hirurg').remove();
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

        if (!contains(array_pathogen, new_pathogen)) {
            array_pathogen.push(new_pathogen);
            pathogens__check_clinic.append(new_pathogen_block(new_pathogen, 'clinic', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), 1, this.getAttribute('data-type-input'), this.getAttribute('data-exception'), this.getAttribute('data-non-typical')));
            pathogens__check_hirurg.append(new_pathogen_block(new_pathogen, 'hirurg', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), 1, this.getAttribute('data-type-input'), this.getAttribute('data-exception'), this.getAttribute('data-non-typical')));
        } else {
            update_pathogen_block(new_pathogen, this.getAttribute('data-material'),this.getAttribute('data-type'));
        }
        // parent.parentNode.append(new_pathogen_block(new_pathogen, 'clinic'));
        if (this.getAttribute('data-type-input') == 'radio') {
            let lvl = document.querySelector('.example_radio');
            let new_lvl = lvl.cloneNode(true);
            let new_inputs = new_lvl.querySelectorAll('input');
            let type = new_lvl.querySelector('.types');
            let new_clear = new_lvl.querySelector('.clear');

            new_clear.addEventListener('click', function() {
                let input_value;
                new_clear.parentNode.querySelectorAll('input').forEach((input) => {
                    input.checked = false;
                    input_value = input.value;
                    material = input.getAttribute('data-material');
                    type = input.getAttribute('data-type');
                });

                let data_material_check = document.querySelectorAll('input[data-material="' + material + '"][value="' + input_value + '"]');
                if (!checkboxes_check(data_material_check)) {
                    del_pathogen_block(input_value, material, type, 'material');
                }
        
                let data_type_check = document.querySelectorAll('input[data-type="' + type + '"][value="' + input_value + '"]');
                if (!checkboxes_check(data_type_check)) {
                    del_pathogen_block(input_value, material, type, 'type');
                }

                let checkboxes_named = document.querySelectorAll('input[type="checkbox"][value="' + input_value + '"]');
                if (!checkboxes_check(checkboxes_named)) {
                    document.getElementById(input_value + ' clinic').remove();
                    document.getElementById(input_value + ' hirurg').remove();
                    array_pathogen.splice(array_pathogen.indexOf(input_value), 1);
                }
            });

            new_inputs.forEach((new_input) => {
                new_input.value = new_pathogen;
                new_input.setAttribute('data-material', this.getAttribute('data-material'));
                new_input.setAttribute('data-type', this.getAttribute('data-type'));
                new_input.setAttribute('data-group', this.getAttribute('data-group'));
                new_input.setAttribute('data-subgroup', 'other');
                new_input.setAttribute('data-non-typical', this.getAttribute('data-non-typical'));
                new_input.setAttribute('name', new_pathogen);

                new_input.addEventListener('change', function () {
                    if (this.checked) {
                        if (getComputedStyle(clinic).display == "none") {
                            fadeIn(clinic,500);
                            fadeIn(hirurg,500);
                        }

                        if (!contains(array_pathogen, this.value)) {
                            array_pathogen.push(this.value);
                            pathogens__check_clinic.append(new_pathogen_block(this.value, 'clinic', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), this.getAttribute('data-probs'), 'radio', this.getAttribute('data-exception'), this.getAttribute('data-non-typical')));
                            pathogens__check_hirurg.append(new_pathogen_block(this.value, 'hirurg', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), this.getAttribute('data-probs'), 'radio', this.getAttribute('data-exception'), this.getAttribute('data-non-typical')));
                        } else {
                            document.getElementById(this.value + ' ' + 'clinic').setAttribute('data-probs', this.getAttribute('data-probs'));
                            document.getElementById(this.value + ' ' + 'hirurg').setAttribute('data-probs', this.getAttribute('data-probs'));
                        }
                    }
                });
            });
            new_inputs[0].checked = true;
            new_inputs[0].setAttribute('data-probs', 1);
            new_inputs[1].setAttribute('data-probs', 2);
            type.textContent = new_pathogen;
            new_lvl.classList.add('pathogen__item_vis');
            parent.parentNode.append(new_lvl);
        } else {
            let lvl = document.querySelector('.for_js');
            let new_lvl = lvl.cloneNode(true);
            let new_input = new_lvl.querySelector('input');
            let type = new_lvl.querySelector('.types');
            new_input.value = new_pathogen;
            new_input.checked = true;
            new_input.setAttribute('data-material', this.getAttribute('data-material'));
            new_input.setAttribute('data-type', this.getAttribute('data-type'));
            new_input.setAttribute('data-group', this.getAttribute('data-group'));
            new_input.setAttribute('data-subgroup', 'other');
            new_input.setAttribute('data-non-typical', this.getAttribute('data-non-typical'));
            type.textContent = new_pathogen;
            new_lvl.classList.add('pathogen__item_vis');

            new_input.addEventListener('change', function () {
                //если отмечаем чекбокс, то открываем блоки клиническую и хирургичекую картин, создаем элемент со значением чекбокса и помещаем этот элемент в эти блоки
                if (this.checked) {
                    if (!contains(array_pathogen, this.value)) {
                        array_pathogen.push(this.value);
                        pathogens__check_clinic.append(new_pathogen_block(this.value, 'clinic', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), 1, 'checkbox', this.getAttribute('data-exception'), this.getAttribute('data-non-typical')));
                        // if (this.getAttribute('data-material') != 'blood') {
                        pathogens__check_hirurg.append(new_pathogen_block(this.value, 'hirurg', this.getAttribute('data-material'), this.getAttribute('data-type'), this.getAttribute('data-group'), this.getAttribute('data-subgroup'), 1, 'checkbox', this.getAttribute('data-exception'), this.getAttribute('data-non-typical')));
                        // }
                    } else {
                        update_pathogen_block(this.value, this.getAttribute('data-material'),this.getAttribute('data-type'));
                    }
                    
                } else {
                    let data_material_check = document.querySelectorAll('input[data-material="' + this.getAttribute('data-material') + '"][value="' + this.value + '"]');
                    del_pathogen_block(this.value, this.getAttribute('data-material'), this.getAttribute('data-type'), 'type');

                    if (!checkboxes_check(data_material_check)) {
                        del_pathogen_block(this.value, this.getAttribute('data-material'), this.getAttribute('data-type'), 'material');
                    }

                    let checkboxes_named = document.querySelectorAll('input[value="' + this.value + '"]'); //массив всех чекбоксов с одинаковым значением
                    //если убираем отметку, то проверяем остались ли отмеченные чекбоксы с одинаковым значением, если нет, то удаляем из картин элемент
                    if (!checkboxes_check(checkboxes_named)) {
                        array_pathogen.splice(array_pathogen.indexOf(new_input.value), 1);
                        document.getElementById(this.value + ' clinic').remove();
                        document.getElementById(this.value + ' hirurg').remove();
                        // checkboxes_clear(checkboxes_named);
                    }
                }
            });
            parent.parentNode.append(new_lvl);
        }
    });
});


const none_pathogens = document.querySelectorAll('.input_none_pathogen');

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

document.querySelector('.clear_none_pathogen').addEventListener('click', function () {
    let parent = findAncestor(this, 'pathogens__wrapper');
    parent.querySelectorAll('input').forEach((inp) => {
        if (!inp.classList.contains('input_none_pathogen')){
            inp.disabled = false;
        }
    });
    this.style.display = 'none';
});

none_pathogens.forEach((none_pathogen) => {
    none_pathogen.addEventListener('change', function () {
        let parent = findAncestor(this, 'pathogens__wrapper');
        if (this.checked) {
            parent.querySelectorAll('input').forEach((inp) => {
                if (!inp.classList.contains('input_none_pathogen')){
                    inp.disabled = true;
                }
            });
        } else {
            parent.querySelectorAll('input').forEach((inp) => {
                if (!inp.classList.contains('input_none_pathogen')){
                    inp.disabled = false;
                }
            });
        }
    });
});
