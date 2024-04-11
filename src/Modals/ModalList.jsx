import ModalBasic from "./ModalBasic";
import { ButtonList } from "../Components";

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getClientPosition } from "../utilities";
import css from "./style.module.css";

export default function ModalList({ onBack, objects, onChange, AddHistoryItem }) {
	console.log(objects);
	const [active, setActive] = useState({ active: false });
	const refMain = useRef(null);
	const [lastMove, setLastMove] = useState({ from: 0, to: 0 });

	const getAnimation = index => {
		if (lastMove.from === lastMove.to) return 0;
		if (index === lastMove.to) return lastMove.from - lastMove.to;
		if (index < lastMove.to && index < lastMove.from) return 0;
		if (index > lastMove.to && index <= lastMove.from) return -1;
		if (index < lastMove.to && index >= lastMove.from) return 1;

		return 0;
	};
	const handleStart = e => {
		const { height, top } = refMain.current.getBoundingClientRect();
		const { y } = getClientPosition(e);

		// para saber la ubicacion relatavia del click
		const positionY = y - top;
		// por si el click se sale del contennedor
		if (positionY < 0) return false;
		if (positionY > height) return false;

		// cada item cuanto ocupa?
		const heightElement = height / objects.length;

		setActive({ active: true, from: Math.ceil(positionY / heightElement) - 1 });
	};
	const handleChange = ({ from, to, position }) => {
		const indexMove = from;
		const indexTarget = to;
		if (from === to) return false;

		const newArr = [];
		for (const index in objects) {
			if (parseInt(index) === indexTarget) {
				if (position === "prev") newArr.push(objects[indexMove], objects[index]);
				else newArr.push(objects[index], objects[indexMove]);
			} else if (parseInt(index) !== indexMove) newArr.push(objects[index]);
		}
		const newposition = newArr.findIndex(obj => obj.id === objects[from].id);
		if (indexMove === newposition) return false;
		setLastMove({ from: indexMove, to: newposition });
		console.log(`${indexMove} -> ${newposition}`);
		onChange(newArr);
	};
	const handleEnd = e => {
		const { height, top } = refMain.current.getBoundingClientRect();
		const { y } = getClientPosition(e);

		let positionY = y - top;
		// por si suelta fuera
		if (positionY < 0) positionY = 10;
		if (positionY > height) positionY = height;

		const heightElement = height / objects.length;
		const heightSlot = height / (objects.length * 2);

		const numberElement = Math.ceil(positionY / heightElement) - 1;
		const slot = Math.ceil(positionY / heightSlot) / 2 - numberElement;

		const pos = slot < 1 ? "prev" : "next";
		console.log(`${active.from} -> ${numberElement} on ${pos}`);
		handleChange({ from: active.from, to: numberElement, position: pos });
		setActive({ active: false, from: 0 });
	};

	return (
		<ModalBasic position="center" type="float" blur onBack={onBack}>
			{active.active && <DragItem object={objects[active.from]} />}

			<div
				onTouchStart={handleStart}
				onTouchEnd={handleEnd}
				onMouseDown={handleStart}
				onMouseUp={handleEnd}
				onMouseLeave={() => setActive({ active: false, from: 0 })}
				ref={refMain}
				style={{ display: "flex", flexDirection: "column", gap: 10 }}
			>
				{objects.map((obj, key) => (
					<>
						{key !== active.from && key - 1 !== active.from && <BarDrop active={active.active} />}
						<ButtonList key={key + obj.id} object={obj} diference={getAnimation(key)} />
						{key !== active.from && key === objects.length - 1 && <BarDrop active={active.active} />}
					</>
				))}
			</div>
		</ModalBasic>
	);
}
ModalList.propTypes = {
	onBack: PropTypes.func,
	objects: PropTypes.array,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};

BarDrop.propTypes = { active: PropTypes.bool };
function BarDrop({ active }) {
	if (active) return <div className={css.barDrop} />;
	return <></>;
}

DragItem.propTypes = { object: PropTypes.object };
function DragItem({ object }) {
	const [coordenadas, setCoordenadas] = useState({});
	useEffect(() => {
		const handleUpload = e => {
			const { y, x } = getClientPosition(e);
			setCoordenadas({ x, y });
		};
		document.body.addEventListener("touchmove", handleUpload);
		document.body.addEventListener("mousemove", handleUpload);

		return () => {
			document.body.removeEventListener("touchmove", handleUpload);
			document.body.removeEventListener("mousemove", handleUpload);
		};
	}, []);
	if (!coordenadas.x) return <></>;
	return createPortal(
		<div
			style={{
				position: "absolute",
				top: coordenadas.y || 0,
				left: coordenadas.x || 0,
				zIndex: 15,
				transform: "translate(-50%,-50%)",
				pointerEvents: "none",
			}}
		>
			<ButtonList object={object} />
		</div>,
		document.body
	);
}
