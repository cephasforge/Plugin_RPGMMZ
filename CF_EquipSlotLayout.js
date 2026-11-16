/*:
 * 
 * @author Cephas Forge
 * 
 * @url https://github.com/cephasforge/Plugin_RPGMMZ
 * 
 * @plugindesc
 * Configure the equipment slots of your characters.
 * 
 * @param slotLayout
 * @text Equipment Layout
 * @desc List of equipment type IDs, in display order. An ID can be repeated to get multiple slots of the same type.
 * @type Number[]
 * @default ["1","2","3","3","3"]
 * 
 * @help
 * This plugin lets you define how equipment slots are set up for
 * your characters. It also lets you repeat a slot, so a character
 * can equip several pieces of equipment of the same type.
 *
 * For example, by editing the array ["1","2","3","3","3"], characters
 * can equip the equipment type matching that position in your
 * database three times. Here, type 3 is Head by default, so the
 * character equipment menu will show: Weapon, Shield, Head, Head, Head.
 * 
 */

(()=>{
    const systemParams = PluginManager.parameters("CF_EquipSlotLayout");
    const layout = JSON.parse(systemParams.slotLayout || "[]").map(Number);

    const WVSD_Game_Actor = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function(){
        // Overrides the engine's equipment slot list so the same equipment type
        // can appear in several slots (e.g. two "Rune" slots using one type ID).
        // The slot order comes from the "slotLayout" plugin parameter: repeat an ID
        // to get more slots of that type. Dual Wield still works (slot 2 becomes a weapon slot).
        const slots = layout.length > 0 ? layout.slice() : WVSD_Game_Actor.call(this);

        if(slots.length >= 2 && this.isDualWield()){
            slots[1] = 1;
        }

        return slots;
    }
})();