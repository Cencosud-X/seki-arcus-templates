class DniFormatter {
	toRut(rut: string): string {
		if (!rut) {
			return rut;
		}
		let result = rut.slice(-4, -1) + "-" + rut.substr(rut.length - 1);
		for (let i = 4; i < rut.length; i += 3) {
			result = rut.slice(-3 - i, -i) + "." + result;
		}

		return result;
	}

	clean(rut: string): string {
		return rut.toLowerCase().replace(/[\.-]/g, "");
	}

	isRutValid(rut: string): boolean {
		if (typeof rut !== "string") {
			return false;
		}

		const checkRut = rut.toLowerCase().replace(/\./g, "");

		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(checkRut)) return false;

		const tmp = checkRut.split('-');
		const digv = tmp[1];
		let digits = parseInt(tmp[0]);

		let m = 0, s = 1;
		for (; digits; digits = Math.floor(digits / 10))
			s = (s + digits % 10 * (9 - m++ % 6)) % 11;
		const dv = s ? s - 1 : 'k';

		return dv == digv;
	}
}

export default new DniFormatter();
