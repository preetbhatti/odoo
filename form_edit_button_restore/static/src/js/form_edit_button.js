/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";

patch(FormController.prototype, {
    setup() {
        super.setup();
        this.model.config.mode = "readonly";
    },
    edit(params) {
        var self = this;
        if(this.canEdit && this.model.config.mode === "readonly") {
            this.model.config.mode = "edit";
            this.model.load().then(() => {
                self.render(true);
            })
        }
    },
    async saveAndClose() {
        var res = await this.save();
        if (res) { this.model.config.mode = "readonly" }
    },
    async discardAndClose() {
        await this.discard();
        this.model.config.mode = "readonly";
    }
});