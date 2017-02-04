"use strict";

/**
 *  Class for events on buttons and form submit
 */
class Event {

    /**
     *  Add events for all buttons remove and update
     * @param edit User class method
     * @param del User class method
     */
    static addEventButtons(edit, del) {

        Event.removeEventButton(edit, del);

        let delButtons = document.getElementsByClassName('delete-user');
        for (let item of delButtons) {
            item.addEventListener('click', function (event) {
                event.preventDefault();
                del(this.dataset.id);
            });
        }

        let editButtons = document.getElementsByClassName('edit-user');
        for (let item of editButtons) {
            item.addEventListener('click', function (event) {
                event.preventDefault();
                edit(this.dataset.id, this.dataset.name);
            });
        }

    }

    /**
     * Add events for one button
     * @param id  user id
     * @param edit User class method
     * @param del User class method
     */
    static addEventButton(id, edit, del) {

        let row = document.getElementsByClassName('tr-' + id)[0];

        let delButtons = row.getElementsByClassName('delete-user')[0];

        delButtons.addEventListener('click', function (event) {
            event.preventDefault();
            del(this.dataset.id);
        });

        let editButtons = row.getElementsByClassName('edit-user')[0];
        editButtons.addEventListener('click', function (event) {
            event.preventDefault();
            edit(this.dataset.id, this.dataset.name);
        });

    }

    /**
     *  Remove Events from all buttons add and delete
     * @param edit User class method
     * @param del User class method
     */
    static removeEventButton(edit, del) {

        let delButtons = document.getElementsByClassName('delete-user');
        for (let item of delButtons) {
            item.removeEventListener('click', function () {
                del(this.dataset.id);
            });
        }

        let editButtons = document.getElementsByClassName('edit-user');
        for (let item of editButtons) {
            item.removeEventListener('click', function (event) {
                edit(this.dataset.id, this.dataset.name);
            });
        }

    }

    /**
     *  Add events for add form
     * @param add User class method
     */
    static addEventSubmit(add) {
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

    /**
     * Add events for edit form
     * @param update User class method
     */
    static addEventEditForm(update) {
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


module.exports = {'Event': Event};