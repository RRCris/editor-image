import { useEffect } from "react";

export default function ControlKey() {
	useEffect(() => {
		document.body.addEventListener("keydown", console.log);
		return () => {
			document.body.removeEventListener("keydown", console.log);
		};
	}, []);
	return <div>ControlKey</div>;
}
