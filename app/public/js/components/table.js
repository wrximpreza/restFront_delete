"use strict";
const {httpGet} = require('./request');
const {Template} = require('./template');
const {Event} = require('./event');

let table = document.getElementsByClassName('table')[0].getElementsByTagName('tbody')[0];

/**
 *  User class
 */
class User {

    /**
     * Add all users
     */
    static all() {
        httpGet('http://localhost:3000/users', 'GET').then(
            response => {
                let users = User.checkUsers(response);

                let tableHtml = Template.genTable(users);
                table.insertAdjacentHTML('beforeBegin', tableHtml);
                Event.addEventButtons(User.edit, User.del);
                Event.addEventSubmit(User.add);
            },
            error => {
                console.log('Error loaded users');
            }
        );
    };

    /**
     * Add single user
     * @param body
     */
    static add(body) {
        httpGet('http://localhost:3000/users', 'POST', body).then(
            response => {

                try {

                    let user = JSON.parse(response);
                    if (Number.isInteger(user.id)) {

                        let row = Template.getRow({'name': body.name, 'id': user.id}, user.id);
                        table.insertAdjacentHTML('beforeend', row);
                        Event.addEventButton(user.id, User.edit, User.del);
                        document.forms.add.name.value = "";
                        alert('User added');

                    } else {
                        throw new Error();
                    }

                } catch (e) {
                    throw new Error('Error add user to base');
                }

            },
            error => {
                console.log(error);
            }
        );
    };

    /**
     * Update user
     * @param body
     * @param userId
     */
    static update(body, userId) {
        httpGet('http://localhost:3000/users/' + userId, 'PUT', body).then(
            response => {

                if (response == 'OK') {
                    alert('User update');

                    let row = document.getElementsByClassName('tr-' + userId)[0].getElementsByTagName('td')[2];
                    while (row.hasChildNodes())
                        row.removeChild(row.lastChild);
                    row.insertAdjacentHTML('beforeend', Template.getButtons(body.name, userId));
                    document.getElementsByClassName('tr-' + userId)[0].getElementsByTagName('td')[1].innerText = body.name;
                    Event.addEventButton(userId, User.edit, User.del);

                } else {
                    throw new Error();
                }

            },
            error => {
                console.log(error);
            }
        );
    };

    /**
     * Edit user
     * @param id
     * @param name
     */
    static edit(id, name) {
        let userId = Number(id);
        let row = document.getElementsByClassName('tr-' + userId)[0].getElementsByTagName('td')[2];
        while (row.hasChildNodes())
            row.removeChild(row.lastChild);
        row.insertAdjacentHTML('beforeend', Template.getForm(name, userId));
        Event.addEventEditForm(User.update);
    };

    /**
     * Delete user
     * @param item
     */
    static del(item) {

        let userId = Number(item);
        httpGet('http://localhost:3000/users/' + userId, 'DELETE').then(
            response => {
                alert('User delete');
                document.getElementsByClassName('tr-' + userId)[0].remove();
            },
            error => {
                alert('Error delete user');
                console.log(error);
            }
        )
    };

    /**
     * Check user for null and undefined
     * @param data
     * @returns {{}}
     */
    static checkUsers(data) {
        let users = {};
        try {
            let users = JSON.parse(data);
            return users.filter(function (item, index) {
                if (!Object.is(item, null) && !Object.is(item, {})) {
                    if (typeof item.name != 'undefined') {
                        item.id = index;
                        return item;
                    }
                }
            });
        } catch (e) {
            console.log('Bad parse JSON: ' + e.message);
        }
        return users;
    }

}


module.exports = {init: User.all};