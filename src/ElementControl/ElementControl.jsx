import PropTypes from "prop-types";

// import css from "./style.module.css";

import { useEffect, useState } from "react";

import { PreprocessProperties, processFilters, createClipPath, DiferenceProperties, GetBase64 } from "../utilities";
import FramePosition from "../Frames/Position/FramePosition";
import FrameSize from "../Frames/Size/FrameSize";
import FrameCrop from "../Frames/Crop/FrameCrop";
import FrameSelect from "../Frames/Select/FrameSelect";
import FrameUnselect from "../Frames/UnSelect/FrameUnselect";

import ModalPosition from "../Modals/ModalPosition";
import ModalTools from "../Modals/ModalTools";
import ModalSize from "../Modals/ModalSize";
import ModalFormatsSize from "../Modals/ModalFormatsSize";
import ModalCrop from "../Modals/ModalCrop";
import ModalFormatsCrop from "../Modals/ModalFormatsCrop";
import ModalFilters from "../Modals/ModalFilters";
import ModalFilterGrises from "../Modals/ModalFilterGrises";
import ModalFilterDesenfoque from "../Modals/ModalFilterDesenfoque";
import ModalFilterSepia from "../Modals/ModalFilterSepia";
import ModalFilterSaturacion from "../Modals/ModalFilterSaturacion";
import ModalFilterContraste from "../Modals/ModalFilterContraste";
import ModalFilterHue from "../Modals/ModalFilterHue";
import ModalFilterBrillo from "../Modals/ModalFilterBrillo";
import ModalRotation from "../Modals/ModalRotation";
import FrameRotation from "../Frames/Rotation/FrameRotation";
import ModalRename from "../Modals/ModalRename";
import { PipelineEvent, ev } from "../observables";

import ModalHelpCrop from "../Modals/ModalHelpCrop";
import ModalHelpPosition from "../Modals/ModalHelpPosition";
import ModalHelpSize from "../Modals/ModalHelpSize";
import ModalHelpFilter from "../Modals/ModalHelpFilter";

const Tools = {
	unselect: FrameUnselect,
	select: FrameSelect,
	crop: FrameCrop,
	position: FramePosition,
	size: FrameSize,
	rotation: FrameRotation,
};

const Modals = {
	selectTools: ModalTools,
	position: ModalPosition,
	size: ModalSize,
	formatsSize: ModalFormatsSize,
	formatsCrop: ModalFormatsCrop,
	crop: ModalCrop,
	filters: ModalFilters,
	filterGrises: ModalFilterGrises,
	filterDesenfoque: ModalFilterDesenfoque,
	filterSepia: ModalFilterSepia,
	filterSaturacion: ModalFilterSaturacion,
	filterContraste: ModalFilterContraste,
	filterHue: ModalFilterHue,
	filterBrillo: ModalFilterBrillo,
	rotation: ModalRotation,
	rename: ModalRename,
	helpCrop: ModalHelpCrop,
	helpPosition: ModalHelpPosition,
	helpSize: ModalHelpSize,
	helpFilter: ModalHelpFilter,
};

// initProperties = {x,y,w,h,src}
export default function ElementControl({
	refLienzo,
	initProperties,
	AddHistoryItem,
	BackModal,
	AddHistoryProperties,
	onBackProperties,
	zIndex,
	deleteMe,
	...props
}) {
	const [properties, setProperties] = useState({
		...initProperties,
		lockAspect: false,
		lockAspectCrop: false,
		typeElement: "Image",
		rotation: 0,
		deleteMe: false,
		filters: {
			desenfoque: 0,
			sepia: 0,
			saturacion: 1,
			contraste: 1,
			hue: 0,
			grises: 0,
			brillo: 1,
		},
		clipPath: [
			{
				x: 0,
				y: 0,
			},
			{
				x: initProperties.width,
				y: 0,
			},
			{
				x: initProperties.width,
				y: initProperties.height,
			},
			{
				x: 0,
				y: initProperties.height,
			},
		],
	});
	const [myModal, setMyModal] = useState(null);
	// evento atras en propiedades
	useEffect(() => {
		const sub = PipelineEvent.sub(ev.ClickBackProperties, last => {
			if (last?.id === properties.id) {
				setProperties(prop => ({ ...prop, ...last }));
				onBackProperties();
			}
		});
		return () => sub.unsubscribe();
	}, []);
	// evento de cambio de modal
	useEffect(() => {
		const sub = PipelineEvent.sub(ev.newModal, modal => {
			if (modal?.id === properties.id) {
				setMyModal(modal);
			} else {
				setMyModal(null);
			}
		});
		return () => sub.unsubscribe();
	}, []);
	// cambia url to base64
	useEffect(() => {
		if (properties.object.src.includes("https://demos.booksandbooksdigital.com.co/")) {
			GetBase64(properties.object.src).then(img => {
				properties.object.src = img;
				setProperties({ ...properties });
			});
		}
	}, []);
	// borrar item
	useEffect(() => {
		if (properties.deleteMe) deleteMe();
	}, [properties]);

	const HandleChangeProperties = newProperties => {
		const dif = DiferenceProperties(properties, newProperties);
		if (Object.entries(dif).length > 1) {
			const process = PreprocessProperties(newProperties, properties);
			AddHistoryProperties(dif);
			setProperties(process);
		}
	};

	const ToolActive = myModal ? Tools[myModal.frame] : Tools.unselect;
	const ModalActive = myModal ? Modals[myModal.modalName] : undefined;

	const SHOWSTYLEROTATE = ToolActive !== Tools.size && ToolActive !== Tools.crop;

	const SelectElement = () => {
		if (!myModal) {
			AddHistoryItem(
				{
					modalName: "selectTools",
					id: properties.id,
					frame: "select",
				},
				true
			);
		}
	};
	console.log("%cRender Element", "color:#cc9");
	return (
		<div onClick={SelectElement} {...props} style={{ zIndex }}>
			{ModalActive && (
				<ModalActive
					properties={properties}
					onBack={BackModal}
					onChange={HandleChangeProperties}
					AddHistoryItem={AddHistoryItem}
				/>
			)}

			<ToolActive properties={properties} refLimit={refLienzo} onChange={HandleChangeProperties} zIndex={zIndex}>
				{properties.typeElement === "Image" && (
					<div style={{ position: "relative" }}>
						<img
							alt={`Imagen de Elemento(${properties.object.name})`}
							src={properties.object.src}
							style={{
								width: properties.width,
								height: properties.height,
								clipPath: createClipPath(properties.clipPath, properties.width, properties.height),
								WebkitUserSelect: "none",
								MozUserSelect: "none",
								msUserSelect: "none",
								pointerEvents: "none",
								filter: processFilters(properties.filters),
								transform: SHOWSTYLEROTATE && `rotate(${properties.rotation}deg)`,
							}}
							onDragStart={e => e.preventDefault()}
						/>
						{ToolActive === Tools.crop && (
							<img
								alt={`Imagen de Elemento(${properties.object.name})`}
								src={properties.object.src}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: properties.width,
									height: properties.height,
									opacity: 0.5,
									WebkitUserSelect: "none",
									MozUserSelect: "none",
									msUserSelect: "none",
									pointerEvents: "none",
									filter: `grayscale(${properties.filters.grises}) blur(${properties.filters.desenfoque}px) sepia(${properties.filters.sepia}) saturate(${properties.filters.saturacion}) contrast(${properties.filters.contraste}) hue-rotate(${properties.filters.hue}deg) brightness(${properties.filters.brillo})`,
								}}
								onDragStart={e => e.preventDefault()}
							/>
						)}
					</div>
				)}
			</ToolActive>
		</div>
	);
}
ElementControl.propTypes = {
	refLienzo: PropTypes.object,
	initProperties: PropTypes.object,
	AddHistoryItem: PropTypes.func,
	lastModal: PropTypes.obj,
	BackModal: PropTypes.func,
	AddHistoryProperties: PropTypes.func,
	onBackProperties: PropTypes.func,
	zIndex: PropTypes.number,
	deleteMe: PropTypes.func,
};
