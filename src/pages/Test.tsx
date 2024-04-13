import { useEffect, useState } from 'react';
import axios from 'axios';
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function Test() {
	// const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				'http://10.101.21.210:8000/api/text2speech?text=Абылай, мен сені сүйемін, мен жаман сөз айта аламын, қотақбас',
	// 				{ responseType: 'blob' }
	// 			);
	// 			console.log('Response:', response);
	// 			if (response.data instanceof Blob) {
	// 				setAudioBlob(response.data);
	// 			} else {
	// 				console.error('Response data is not a Blob:', response.data);
	// 			}
	// 		} catch (error) {
	// 			console.error('Error fetching audio:', error);
	// 		}
	// 	})();
	// }, []);

	// const handlePlay = () => {
	// 	if (audioBlob) {
	// 		const audio = new Audio();
	// 		const audioUrl = URL.createObjectURL(audioBlob);
	// 		audio.src = audioUrl;
	// 		audio.play();

	// 		audio.onended = () => URL.revokeObjectURL(audioUrl);
	// 	}
	// };

	const addAudioElement = async (blob: Blob) => {
		// const url = URL.createObjectURL(blob);
		const formData = new FormData();
		formData.append('file', blob);
		await axios
			.post('http://10.101.21.210:8080/audio/upload', formData)
			.then(console.log)
			.catch(console.error);
		// const audio = document.createElement('audio');
		// audio.src = url;
		// audio.controls = true;
		// document.body.appendChild(audio);
	};

	return (
		<div>
			<AudioRecorder
				onRecordingComplete={addAudioElement}
				audioTrackConstraints={{
					noiseSuppression: true,
					echoCancellation: true,
				}}
				// downloadOnSavePress={true}
				downloadFileExtension='wav'
			/>
		</div>
	);
}
