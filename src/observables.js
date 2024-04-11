import { Subject } from "rxjs";
export const ev = {
	ClickBackProperties: "ClickBackProperties",
	newModal: "newModal",
	exportImage: "exportImage",
};
class EventEmit {
	observable$ = new Subject();
	get() {
		return this.observable$.asObservable();
	}

	sub(event, callback) {
		if (!ev[event]) return console.warn(`El evento ${event} no se encuentra registrado, añadelo en la constante "ev"`);
		const call = info => {
			if (info.event === event) callback(info.data);
		};
		return this.observable$.subscribe(call);
	}

	emit(event, data) {
		if (!ev[event]) return console.warn(`El evento ${event} no se encuentra registrado, añadelo en la constante "ev"`);
		this.observable$.next({ event, data });
	}
}

export const PipelineEvent = new EventEmit();
