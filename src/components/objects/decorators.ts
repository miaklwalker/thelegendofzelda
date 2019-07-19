//@ts-ignore
const EMPTY = {};
const HOP = Object.prototype.hasOwnProperty;

let fns = {
      /**  let cachedFn = memoize(originalFn); */
      //@ts-ignore
	memoize(fn, opt=EMPTY) {
            //@ts-ignore
            let cache = opt.cache || {};
            //@ts-ignore
		return function(...a) {
                  //@ts-ignore
                  let k = String(a[0]);
                  //@ts-ignore
                  if (opt.caseSensitive===false) k = k.toLowerCase();
                  //@ts-ignore
			return HOP.call(cache,k) ? cache[k] : (cache[k] = fn.apply(this, a));
		};
	},

      /** let throttled = debounce(10, console.log); */
      //@ts-ignore
	debounce(fn, opts) {
		if (typeof opts==='function') { let p = fn; fn = opts; opts = p; }
            let delay = opts && opts.delay || opts || 0,
            //@ts-ignore
                  args, context, timer;
                  //@ts-ignore
		return function(...a) {
                  args = a;
                  //@ts-ignore
                  context = this;
                  //@ts-ignore
			if (!timer) timer = setTimeout( () => {
                        //@ts-ignore
				fn.apply(context, args);
				args = context = timer = null;
			}, delay);
		};
	},
//@ts-ignore
	bind(target, key, { value: fn }) {
		// In IE11 calling Object.defineProperty has a side-effect of evaluating the
		// getter for the property which is being replaced. This causes infinite
		// recursion and an "Out of stack space" error.
		let definingProperty = false;
		return {
			configurable: true,
			get() {
				if (definingProperty) {
					return fn;
				}
				let value = fn.bind(this);
				definingProperty = true;
				Object.defineProperty(this, key, {
					value,
					configurable: true,
					writable: true
				});
				definingProperty = false;
				return value;
			}
		};
	}
};

//@ts-ignore
let memoize = multiMethod(fns.memoize),
//@ts-ignore
      debounce = multiMethod(fns.debounce),
      //@ts-ignore
	bind = multiMethod((f,c)=>f.bind(c), ()=>fns.bind);

export { memoize, debounce, bind };
export default { memoize, debounce, bind };


/** Creates a function that supports the following calling styles:
 *	d() - returns an unconfigured decorator
 *	d(opts) - returns a configured decorator
 *	d(fn, opts) - returns a decorated proxy to `fn`
 *	d(target, key, desc) - the decorator itself
 *
 *	@Example:
 *		// simple identity deco:
 *		let d = multiMethod( fn => fn );
 *
 *		class Foo {
 *			@d
 *			bar() { }
 *
 *			@d()
 *			baz() { }
 *
 *			@d({ opts })
 *			bat() { }
 *
 *			bap = d(() => {})
 *		}
 */
//@ts-ignore
function multiMethod(inner, deco) {
	deco = deco || inner.decorate || decorator(inner);
      let d = deco();
      //@ts-ignore
	return (...args) => {
		let l = args.length;
		return (l<2 ? deco : (l>2 ? d : inner))(...args);
	};
}

/** Returns function supports the forms:
 *	deco(target, key, desc) -> decorate a method
 *	deco(Fn) -> call the decorator proxy on a function
 */
//@ts-ignore
function decorator(fn) {
      //@ts-ignore
	return opt => (
            //@ts-ignore
		typeof opt==='function' ? fn(opt) : (target, key, desc) => {
			desc.value = fn(desc.value, opt, target, key, desc);
		}
	);
}