import { Stack } from "expo-router";
import { Button } from "react-native";

<Stack.Screen
	name="modal"
	options={{
		presentation: 'modal',
		headerLeft: () => <Button title="Close" onPress={() => router.back()} />
	}}
/>