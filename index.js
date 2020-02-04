function map(observable, fn) {
	observable.subscribe(fn)
	return new Observable();
}

function prepareSubscriber(subscriber) {
		const extendedSubscriber = {};
		const defaultSubscriber = {
			next: (value) => { console.log('Next: ', value) },
			error: (err) => { console.log('Error: ', err) },
			complete: () => { console.log('Complete') },
		};

		if (!subscriber) return defaultSubscriber;

		if (typeof subscriber === 'function') {
			extendedSubscriber.next = subscriber;
		}

		return Object.assign({}, defaultSubscriber, extendedSubscriber, subscriber);
}

class Subscriber {
	constructor(observerOrNext = undefined, error = undefined, compelete = undefined) {
		this.isStopped = false;
		this.destination = null;

	}

	static create(next, error, complete) {
		return new Subscriber(next, error, complete);
	}

	next(value) {
		if (!this.isStopped) {
			this._next(value);
		}
	}

	error(error) {
		if (!this.isStopped) {
			this.isStopped = true;
			this._error(error);
		}
	}

	complete() {
		this.isStopped = true;
		this._complete();
	}

	_next(value) {}

	_error(err) {}

	_complete() {}
}

class Observable {
	constructor(observer){
		this.observer = observer;
	}

	subscribe(subscriber){
		return this.observer(prepareSubscriber(subscriber));
	}
}

const obs = new Observable((subscriber) => {
	subscriber.next(1);
	setTimeout(() => {
		subscriber.next(2);
	}, 1000);

	subscriber.complete();

	return function unsubscribe() {

	};
});

obs
	.subscribe({
		next: (val) => console.log('Value: ', val),
	});
