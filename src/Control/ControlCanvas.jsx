/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { toJpeg, toPng } from "html-to-image";
import { InputImage } from "../InputImage/InputImage";
import { useState, useRef, useEffect } from "react";

import css from "./style.module.css";

import { useWidth } from "../hooks";
import ElementControl from "../ElementControl/ElementControl";
import { RadioButton } from "../Components";
import ModalCanvas from "../Modals/ModalCanvas";
import ModalSize from "../Modals/ModalSize";
import ModalList from "../Modals/ModalList";
import ModalFormatsSize from "../Modals/ModalFormatsSize";
import ModalExport from "../Modals/ModalExport";
import { PipelineEvent, ev } from "../observables";
import { filter } from "../utilities";
import ControlKey from "../ControlKey/ControlKey";

function getSize(img) {
	const image = new Image();
	image.src = img;

	return { width: image.width, height: image.height };
}

ControlCanvas.propTypes = {
	defaultImage: PropTypes.array,
	onUpload: PropTypes.func,
};
export default function ControlCanvas({ defaultImage, onUpload }) {
	// renderiza un contenedor para obtener los modales
	const { watch } = useWidth("xl");

	// contenedor del que no se puede salir los puntos arrastrables
	const refLienzo = useRef(null);

	// historiales
	const hisProperties = useRef([]);
	const hisModals = useRef([]);

	const [size, setSize] = useState(
		defaultImage.length === 1 ? getSize(defaultImage[0].url) : { width: 300, height: 450, lockAspect: false }
	);
	const [myModal, setMyModal] = useState(null);
	const [objects, setObjects] = useState(
		defaultImage.length === 1
			? [
					{
						id: defaultImage[0].id,
						positionX: 0,
						positionY: 0,
						width: size.width,
						height: size.height,
						object: {
							type: defaultImage[0].type,
							size: defaultImage[0].size,
							name: defaultImage[0].name,
							src: defaultImage[0].url,
						},
					},
			  ]
			: []
	);

	const [preview, setPreview] = useState(null);

	// SUSCRIPCION A EVENTOS
	useEffect(() => {
		const sub = PipelineEvent.sub(ev.ClickBackProperties, last => {
			if (last?.id === "root") {
				const { objects, id, ...others } = last;
				setSize(others);
				setObjects([...objects]);
				onBackProperties();
			}
		});
		return () => sub.unsubscribe();
	}, []);
	useEffect(() => {
		const sub = PipelineEvent.sub(ev.newModal, modal => {
			if (modal?.id === "root") {
				setMyModal(modal);
			} else {
				setMyModal(null);
			}
		});
		return () => sub.unsubscribe();
	}, []);
	// HANDLES
	const AddHistoryProperties = (newProperties, reset) => {
		if (reset) return (hisProperties.current = [newProperties]);
		hisProperties.current.push({ ...newProperties });
		// setHistoryProperties(newProperties);
	};
	const onBackProperties = () => {
		hisProperties.current.pop();
	};
	const AddModal = (obj, reset) => {
		if (reset) {
			hisModals.current = [obj];
		} else {
			hisModals.current.push(obj);
		}
		PipelineEvent.emit(ev.newModal, hisModals.current.slice(-1)[0]);
	};
	const BackModal = () => {
		hisModals.current.pop();
		PipelineEvent.emit(ev.newModal, hisModals.current[hisModals.current.length - 1]);
	};
	const NewImage = obj => {
		setObjects([...objects, obj]);
	};
	const OptionsCanvas = e => {
		if (e) {
			AddModal({ id: "root", frame: "select", modalName: "optionsCanvas" });
		}
	};
	const ProcessOptionCanvas = key => {
		if (key === "export") {
			AddModal({ id: "root", frame: "select", modalName: "exportCanvas" });
			toJpeg(refLienzo.current, { filter }).then(setPreview);
		} else if (key === "upload") {
			toPng(refLienzo.current, { filter }).then(onUpload);
			BackModal();
		}
	};
	const deleteMe = id => {
		const newObjects = objects.filter(obj => obj.id !== id);
		hisProperties.current = hisProperties.current.filter(obj => obj.id !== id);
		hisModals.current = hisModals.current.filter(obj => obj.id !== id);
		setObjects(newObjects);
	};
	const handleChangeProperties = obj => {
		AddHistoryProperties({ ...size, objects, id: "root" });
		const { width, height, lockAspect, id } = obj;

		setSize({ width, height, lockAspect });
		obj.newObjects && setObjects(obj.newObjects);
	};

	console.log("%cRender Canvas", "color:#99c");

	return (
		<>
			{myModal?.modalName === "optionsCanvas" && (
				<ModalCanvas onBack={BackModal} AddHistoryItem={AddModal} onChange={ProcessOptionCanvas} />
			)}
			{myModal?.modalName === "sizeCanvas" && (
				<ModalSize
					onBack={BackModal}
					AddHistoryItem={AddModal}
					onChange={handleChangeProperties}
					properties={{ ...size, id: "root", objects }}
				/>
			)}
			{myModal?.modalName === "layersCanvas" && (
				<ModalList onBack={BackModal} objects={objects} onChange={setObjects} AddHistoryItem={AddModal} />
			)}
			{myModal?.modalName === "formatsSize" && (
				<ModalFormatsSize onBack={BackModal} properties={size} onChange={setSize} />
			)}
			{myModal?.modalName === "exportCanvas" && <ModalExport onBack={BackModal} properties={{ preview }} />}
			<div className={css.container}>
				<div className={css.container_canvas}>
					<div className={css.canvas} ref={refLienzo} style={{ ...size }}>
						<InputImage AddModal={AddModal} AddImage={NewImage} onBack={BackModal} defaultImage={defaultImage} />
						<ExitCanvas onClick={() => AddModal(undefined, true)} />
						{/* <ControlKey /> */}
						{objects.map((obj, key) => (
							<ElementControl
								key={obj.id}
								refLienzo={refLienzo}
								initProperties={obj}
								AddHistoryItem={AddModal}
								BackModal={BackModal}
								AddHistoryProperties={AddHistoryProperties}
								onBackProperties={onBackProperties}
								zIndex={objects.length - key}
								deleteMe={() => deleteMe(obj.id)}
							/>
						))}
						<div className={css.container_controlCanvas + " remove-me"} style={{ zIndex: objects.length + 1 }}>
							<RadioButton icon="ion:options-sharp" radio={45} onChange={OptionsCanvas} active />
							<RadioButton
								icon="icon-park-twotone:back"
								radio={45}
								onChange={e => PipelineEvent.emit(ev.ClickBackProperties, hisProperties.current.slice(-1)[0])}
								active
							/>
						</div>
					</div>
				</div>
				{watch && <div id="modalPc" className={css.container_controls} />}
			</div>
		</>
	);
}

ExitCanvas.propTypes = {
	onClick: PropTypes.func,
};
function ExitCanvas({ onClick }) {
	return <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} onClick={onClick} />;
}
