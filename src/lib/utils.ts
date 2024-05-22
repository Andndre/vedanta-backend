import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

/**
 * Jika hacker mengubah url redirectTo di path dengan url mereka,
 * maka path tersebut akan menjadi tidak valid (Error 404).
 * Karena huruf pertama diganti dengan '/'
 *
 * Contoh:
 * - /home -> /home (Valid)
 * - https://somesite.com/home -> /ttps://somesite.com/home (Error 404)
 *
 * @param path
 * @returns
 */
export function securePath(path: string) {
	return `/${path.substring(1)}`;
}

export function ssrPromiseLoop<T>(promise: () => Promise<T>, browser: boolean) {
	return browser ? promise() : Promise.resolve<T>({} as T);
}

// Generates 1 or 2 letter initials from name
export function getInitialName(name: string) {
	const firstLetters = name.split(' ').map((n) => n[0]);
	if (firstLetters.length === 1) {
		return firstLetters[0].toUpperCase();
	}
	return firstLetters[0].toUpperCase() + firstLetters[1].toUpperCase();
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
