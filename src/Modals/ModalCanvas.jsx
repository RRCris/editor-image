import ModalBasic from "./ModalBasic";

import { ButtonOption } from "../Components";
import PropTypes from "prop-types";
import { PipelineEvent, ev } from "../observables";
export default function ModalCanvas({ onBack, properties, onChange, AddHistoryItem }) {
	return (
		<ModalBasic onBack={onBack} position="bottom" type="options">
			<div style={{ width: "100%" }}>
				<p
					style={{
						textAlign: "center",
						fontSize: 26,
						fontStyle: "normal",
						fontWeight: "500",
						lineHeight: "normal",
						paddingBottom: 10,
					}}
				>
					¿Qué vas configurar?
				</p>
				<div style={{ width: "100%", background: "#000000", height: 1 }} />
				<ButtonOption
					name="Añadir Objeto"
					icon="carbon:add-filled"
					onClick={() => {
						PipelineEvent.emit(ev.exportImage, true);
						onBack();
					}}
				>
					Add Object
				</ButtonOption>
				<ButtonOption
					name="Editar lienzo"
					icon="tabler:layout-navbar"
					onClick={() => AddHistoryItem({ id: "root", frame: "size", modalName: "sizeCanvas" })}
				/>
				<ButtonOption
					name="Editar Capas"
					icon="solar:layers-outline"
					onClick={() => AddHistoryItem({ id: "root", frame: "select", modalName: "layersCanvas" })}
				/>
				<ButtonOption
					name="Subir a la Nube"
					icon="tabler:cloud-up"
					onClick={() => {
						onChange("upload");
					}}
				/>
				<ButtonOption
					name="Exportar Imagen"
					icon="uil:file-export"
					onClick={() => {
						onChange("export");
					}}
				/>
				<ButtonOption name="Color de fondo" icon="bxs:color-fill" />
			</div>
		</ModalBasic>
	);
}
ModalCanvas.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
