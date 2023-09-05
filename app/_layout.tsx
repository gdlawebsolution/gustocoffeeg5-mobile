import { Stack, useRouter } from 'expo-router';
import { Button } from 'react-native';

const StackLayout = () => {
	const router = useRouter();

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: '#10101E'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}
		>
			<Stack.Screen name="index" options={{ headerTitle: 'Login', headerShown: false }} />
			<Stack.Screen
				name="register"
				options={{
					headerTitle: 'Create account',
					headerRight: () => <Button title="Open" onPress={() => router.push('/modal')} />
				}}
			/>
		</Stack>
	);
};

export default StackLayout;