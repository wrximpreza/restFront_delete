"use strict";

class Event{

    static addEventButton (edit, del) {

        let delButtons = document.getElementsByClassName('delete-user');
        for (let item of delButtons) {
            item.addEventListener('click', function () {
                del(this.dataset.id);
            });
        }

        let editButtons = document.getElementsByClassName('edit-user');
        for (let item of editButtons) {
            item.addEventListener('click', function () {
                edit(this.dataset.id, this.dataset.name);
            });
        }

    }
    static addEventSubmit (add) {
        let formAdd = document.forms.add;
        formAdd.addEventListener('submit', event => {
            event.preventDefault();
            try {
                let userName = formAdd.name.value;
                if (!userName) {
                    throw new Error('Enter correct user name');
                }
                let body = {'name': userName};
                add(body);
            } catch (e) {
                alert(e.message);
            }
        });
    }
    static addEventEditForm (update) {
        let formEdit = document.forms.edit;
        formEdit.addEventListener('submit', event => {
            event.preventDefault();

            let userId = formEdit.dataset.id;
            let userName = formEdit.name.value;
            if (!userName) {
                throw new Error('Enter correct user name');
            }
            let body = {'name': userName};
            update(body, userId);

        });
    }
}


module.exports = {'Event':Event};