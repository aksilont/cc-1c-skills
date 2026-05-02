export const name = 'getFormState: базовая структура — fields, buttons, tables, openForms';
export const tags = ['formstate', 'smoke'];
export const timeout = 60000;

export default async function({ navigateSection, openCommand, clickElement, closeForm, getFormState, assert, step, log }) {

  await step('basic: getFormState на форме списка возвращает таблицу и команды', async () => {
    await navigateSection('Склад');
    const s = await openCommand('Контрагенты');
    log(`form=${s.form} formCount=${s.formCount} tables=${s.tables?.length} buttons=${s.buttons?.length}`);
    assert.ok(s.form != null, 'state.form задан');
    assert.equal(s.formCount, 1, 'Открыта одна форма');
    assert.ok(Array.isArray(s.openForms) && s.openForms.length === 1, 'openForms — массив с одной записью');
    assert.ok(s.tables?.length >= 1, 'На форме списка есть таблица');
    assert.ok(s.tables[0].columns?.length >= 2, 'У таблицы есть колонки');
    assert.ok(s.buttons?.length >= 1, 'На форме есть кнопки');
    await closeForm();
  });

  await step('basic: getFormState на форме элемента возвращает fields с label и value', async () => {
    await navigateSection('Склад');
    await openCommand('Контрагенты');
    await clickElement('ООО Север', { dblclick: true });
    const s = await getFormState();
    log(`fields count=${s.fields?.length}`);
    assert.ok(s.fields?.length >= 1, 'На форме элемента есть поля');
    const named = s.fields.find(f => f.name === 'Наименование');
    log(`Наименование: label='${named?.label}' value='${named?.value}'`);
    assert.ok(named, 'Должно быть поле Наименование');
    assert.equal(named.value, 'ООО Север', 'value поля Наименование');
    assert.ok(named.label, 'У поля есть label');
    await closeForm();
  });
}
