import { LOGGER } from "../reporting/loggerHelper";

export class AndroidKeyActions {
    keycodes = {
        BACK: 4,
        HOME: 3,
        ENTER: 66,
        MENU: 82,
        VOLUME_UP: 24,
        VOLUME_DOWN: 25,
        POWER: 26,
        CAMERA: 27,
        FOCUS: 80,
        MEDIA_PLAY_PAUSE: 85,
        MEDIA_STOP: 86,
        MEDIA_NEXT: 87,
        MEDIA_PREVIOUS: 88,
        VOLUME_MUTE: 164,
        CALL: 5,
        END_CALL: 6,
        SEARCH: 84,
        HEADSET_HOOK: 79,
        BROWSER: 102,
        NOTIFICATION: 83,
        EXPLORER: 64,
        APP_SWITCH: 187
    }

    async pressKey(keyCode: number): Promise<void> {
        try {
            await driver.pressKeyCode(keyCode);
        } catch (error) {
            LOGGER.error(`Error pressing keycode ${keyCode}\n${error.stack}`);
            throw error;
        }
    }

    async pressBack(): Promise<void> {
        await this.pressKey(this.keycodes.BACK);
    }

    async pressHome(): Promise<void> {
        await this.pressKey(this.keycodes.HOME);
    }

    async pressEnter(): Promise<void> {
        await this.pressKey(this.keycodes.ENTER);
    }

    async pressMenu(): Promise<void> {
        await this.pressKey(this.keycodes.ENTER);
    }

    async pressVolumeUp(): Promise<void> {
        await this.pressKey(this.keycodes.VOLUME_UP);
    }

    async pressVolumeDown(): Promise<void> {
        await this.pressKey(this.keycodes.VOLUME_DOWN);
    }

    async pressPower(): Promise<void> {
        await this.pressKey(this.keycodes.POWER);
    }

    async pressCamera(): Promise<void> {
        await this.pressKey(this.keycodes.CAMERA);
    }

    async pressMute(): Promise<void> {
        await this.pressKey(this.keycodes.VOLUME_MUTE);
    }

    async pressSearch(): Promise<void> {
        await this.pressKey(this.keycodes.SEARCH);
    }

    async pressNotification(): Promise<void> {
        await this.pressKey(this.keycodes.NOTIFICATION);
    }

    async pressAppSwitch(): Promise<void> {
        await this.pressKey(this.keycodes.APP_SWITCH);
    }
}