const RolePermission = Object.freeze({
    CREATE:'create',
    READ:'read',
    WRITE:'write',
    EDIT:'edit',
    DELETE:'delete'
});

export default RolePermission;


/* Definitions
   CREATE: Can add new Element or item.
   READ:   Can View an item or a screen ONLY.
   WRITE:  Can insert data and Save for the first time
   EDIT:   Can update and amend information after the First Save.
   DELETE: Can remove items or elements
*/