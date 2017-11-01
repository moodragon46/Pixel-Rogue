import {click} from './screens';

export function initEvents (view : HTMLCanvasElement) {
    view.addEventListener("pointerdown", (ev : PointerEvent) => {
        click(ev.pageX,ev.pageY);
    });
}