import { ConfigProvider } from 'antd';
import RootRout from './routes';
import 'antd/dist/reset.css';

function App() {
	const theme = {
		token: {
			colorPrimary: '#a3c644',
			colorLink: '#39c2d7',
			colorLinkHover: '#464547',
			colorInfo: '#39c2d7',
		},
	};

	return (
		<ConfigProvider theme={theme}>
			<RootRout />
		</ConfigProvider>
	);
}

export default App;
