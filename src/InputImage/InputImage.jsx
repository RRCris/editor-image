import PropTypes from "prop-types";
import { Iconify } from "../Components/Iconify/Iconify";
import { useState, useRef, useEffect } from "react";

import css from "./style.module.css";

import { assingFiles } from "../asingFiles";
import ModalInfo from "../Modals/ModalInfo";
import { PipelineEvent, ev } from "../observables";
import { getClientPosition } from "../utilities";

InputImage.propTypes = {
	AddModal: PropTypes.func,
	AddImage: PropTypes.func,
	onBack: PropTypes.func,
	defaultImage: PropTypes.array,
};
export function InputImage({ AddModal, AddImage, onBack, defaultImage = [] }) {
	// fila de imagenes loistas para insertar
	const [waitPosition, setWaitPosition] = useState(defaultImage.length > 1 ? defaultImage : []);
	// modal con id "import"
	const [myModal, setMyModal] = useState(null);
	// se cambia solo en el momneto de presionar
	const startPos = useRef({ x: 0, y: 0 });
	// elementos
	const refInput = useRef(null);
	const refPreview = useRef(null);
	const refContainer = useRef(null);
	/// SUSCRIBE EVENTS
	useEffect(() => {
		const sub = PipelineEvent.sub(ev.exportImage, () => {
			if (refInput.current) refInput.current.click();
		});
		return () => sub.unsubscribe();
	}, []);
	useEffect(() => {
		const sub = PipelineEvent.sub(ev.newModal, modal => {
			if (modal?.id === "import") {
				setMyModal(modal);
			} else {
				setMyModal(null);
			}
		});
		return () => sub.unsubscribe();
	}, []);
	/// HANDLES
	const handleChangeFile = e => {
		assingFiles(e.target.files, 10).then(({ result }) => {
			if (result.length > 0) {
				AddModal({ id: "import", modalName: "addImageCanvas", frame: "select" });
				setWaitPosition(result);
			}
		});
	};
	const handleDragStart = e => {
		const pos = getClientPosition(e);
		const { x, y } = refContainer.current.getBoundingClientRect();

		startPos.current = { x: pos.x - x, y: pos.y - y };

		document.body.addEventListener("mousemove", handleDraggable);
		document.body.addEventListener("touchmove", handleDraggable);
		document.body.addEventListener("mouseup", handleDrop);
		document.body.addEventListener("touchend", handleDrop);
	};
	const handleDraggable = e => {
		const event = getClientPosition(e);
		const rec = refContainer.current.getBoundingClientRect();
		const pos = { x: event.x - rec.x, y: event.y - rec.y };
		const size = {
			width: Math.abs(event.x - rec.x - startPos.current.x),
			height: Math.abs(event.y - rec.y - startPos.current.y),
		};
		if (size.width < 36) size.width = 36;
		if (size.height < 36) size.height = 36;

		if (refPreview.current) {
			refPreview.current.style.left = Math.min(startPos.current.x, pos.x) + "px";
			refPreview.current.style.display = "block";
			refPreview.current.style.top = Math.min(startPos.current.y, pos.y) + "px";
			refPreview.current.style.width = size.width + "px";
			refPreview.current.style.height = size.height + "px";
		}
	};
	const handleDrop = e => {
		const event = getClientPosition(e);
		const rec = refContainer.current.getBoundingClientRect();
		const file = waitPosition.slice(-1)[0];
		const pos = { x: event.x - rec.x, y: event.y - rec.y };
		const size = {
			width: Math.abs(event.x - rec.x - startPos.current.x),
			height: Math.abs(event.y - rec.y - startPos.current.y),
		};
		if (size.width < 36) size.width = 36;
		if (size.height < 36) size.height = 36;
		const obj = {
			id: file.id,
			...size,
			positionX: Math.min(startPos.current.x, pos.x),
			positionY: Math.min(startPos.current.y, pos.y),
			object: {
				type: file.type,
				size: file.size / 1024 / 1024,
				name: file.name,
				src: file.url,
			},
		};

		if (refPreview.current) {
			refPreview.current.style.display = "none";
		}
		AddImage(obj);
		document.body.removeEventListener("mousemove", handleDraggable);
		document.body.removeEventListener("touchmove", handleDraggable);
		document.body.removeEventListener("mouseup", handleDrop);
		document.body.removeEventListener("touchend", handleDrop);
		waitPosition.pop();
		if (waitPosition.length === 0) onBack && onBack();
		setWaitPosition([...waitPosition]);
	};

	return (
		<>
			{myModal?.modalName === "addImageCanvas" && (
				<ModalInfo
					onBack={() => {
						setWaitPosition([]);
						onBack();
					}}
					message="selecciona el lugar de la imagen"
				/>
			)}
			<div
				style={{
					display: waitPosition.length > 0 ? "flex" : "none",
				}}
				className={css.container_inputFile}
				onMouseDown={handleDragStart}
				onTouchStart={handleDragStart}
				ref={refContainer}
			>
				<div className={css.info}>
					<Iconify icon="ri:drag-drop-line" size={34} />
					<p>Selecciona dentro del lienzo</p>
					<input type="file" ref={refInput} hidden onChange={handleChangeFile} multiple />
				</div>
			</div>
			<div className={css.container_preview} ref={refPreview} />
		</>
	);
}
