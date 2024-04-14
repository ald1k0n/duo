import { ConfigProvider } from 'antd';
import RootRout from './routes';
import 'antd/dist/reset.css';

import { useEffect } from 'react';
import { useAuthStore } from './shared/stores/useAuthStore';
import { UserService } from './services';

function App() {
	const { token, user } = useAuthStore();

	const service = new UserService();

	useEffect(() => {
		if (!user && token) {
			(async () => {
				await service.getCurrentUser();
			})();
		}
	}, [token]);

	const theme = {
		token: {
			colorPrimary: '#a3c644',
			colorLink: '#39c2d7',
			colorLinkHover: '#464547',
			colorInfo: '#39c2d7',
			fontFamily: "Montserrat, sans-serif",
		},
	};

	return (
		<ConfigProvider theme={theme}>
			<RootRout />
		</ConfigProvider>
	);
}

export default App;
