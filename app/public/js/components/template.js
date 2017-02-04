"use strict";
//@todo добавить шаблонизатор в текст и брать c шаблона

/**
 *  Class add table and rows to table
 */
class Template {

    /**
     * Add row to table
     * @param item
     * @param index
     * @returns {string}
     */
    static getRow(item, index) {
        return `<tr class="tr-${item.id}">
                        <td>${item.id + 1}</td>
                        <td>${item.name}</td>
                        <td><a data-id="${item.id}" class="delete-user" href="#delete">Удалить</a> | <a class="edit-user"  data-name="${item.name}"  data-id="${item.id}" href="#update">Изменить</a></td>
                    </tr>`;

    }

    /**
     * Add button remove and update
     * @param name
     * @param index
     * @returns {string}
     */
    static getButtons(name, index) {
        return `<td>
                    <a data-id="${index}" class="delete-user" href="#delete">Удалить</a> |
                    <a class="edit-user"  data-name="${name}"  data-id="${index}" href="#update">Изменить</a>
                </td>`;
    }

    /**
     * Add edit form
     * @param name
     * @param id
     * @returns {string}
     */
    static getForm(name, id) {
        return `<td><form action="" data-id="${id}" name="edit" class="form-inline">
                            <div class="form-group">
                                <label for="updateName" class="sr-only">
                                    Имя
                                </label>
                                <input class="form-control" name="name" type="text" id="updateName" value="${name}">
                            </div>
                            &nbsp;
                            <button type="submit" class="btn btn-primary">Изменить</button>
                        </form></td>`;
    }

    /**
     * Generate table
     * @param users
     * @returns {string}
     */
    static genTable(users) {
        let html = '';
        try {

            users.map(function (item, i) {
                html += Template.getRow(item, i);
            });

        } catch (e) {
            console.log('Error generate table template ' + e.message);
        }
        return html;

    }

}


module.exports = {'Template': Template};