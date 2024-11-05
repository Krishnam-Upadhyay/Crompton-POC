import axios from 'axios';
import {ApiStatus} from '../../Enums/ApiStatus';
import {JsonResponseModel} from '../../Models/JsonResponseModel';
import {enableEncryption} from '../Constants/Constants';
import {Decrypt, Encrypt} from '../Crypto/Crypto';
import {HttpMethod} from './HTTPMethods';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {userDetails} from '../../redux/selectors/selectors';
import {storage} from '../../utils/storage/MMKVStorage';
import {StorageKeys} from '../../utils/storage/StorageKeys';
import {logoutUser} from '../CommonFunctions/CommonFunctions';
import Config from 'react-native-config';

export const ApiCall = async (
	apiUrl: string,
	inputParam: any = {},
	methodType: HttpMethod = HttpMethod.POST,
	shouldEnableEncryption: boolean = enableEncryption,
): Promise<JsonResponseModel> => {
	let responseBody: JsonResponseModel = {
		status: ApiStatus.Error,
		message: '',
		data: null,
	};

	// let ogResponseBody = responseBody;

	const token = storage.getItem(StorageKeys.TOKEN);
	const userId = storage.getItem(StorageKeys.USER_ID);

	try {
		let response: any;
		let bodyData: any;
		let defaultInput: any = {};

		if (userId) {
			defaultInput = {UIdSession: userId ? parseInt(userId) : ''};
		}

		if (typeof inputParam == 'string') {
			inputParam = JSON.parse(inputParam);
		}
		inputParam = {...inputParam, ...defaultInput};

		console.log('inputParam: ', inputParam);

		const stringifyInput =
			typeof inputParam == 'object' ? JSON.stringify(inputParam) : inputParam;

		if (methodType === HttpMethod.POST && inputParam) {
			if (shouldEnableEncryption) {
				const encryptedRequestBody = Encrypt(stringifyInput);
				const finalReqBody = {
					// encryptedData: encryptedRequestBody,
					RequestBody: encryptedRequestBody,
				};
				bodyData = finalReqBody;
			} else {
				bodyData = inputParam;
			}
		}

		// console.log("bodyData: ", bodyData)

		// const headers = {
		// 		Origin: Config.WEB_URL,
		// 		'Content-Type': 'application/json',
		// 			'Permission-Policy': 'microphone=(self) camera=(self)',
		// 			'Cross-Origin-Embedder-Policy': 'require-corp',
		// 			'Cross-Origin-Opener-Policy': 'same-origin',
		// 			'Cross-Origin-Resource-Policy': 'same-origin',
		// };

		let config: any = {
			url: apiUrl,
			method: methodType.toString(),
			data: bodyData,
		};
		// if (apiUrl.includes('/Login')) {
		// 	config = {...config, headers};
		// } else {
			config = {
				...config,
				headers: {
					Authorization: `Bearer ${token}`,
					Origin: Config.WEB_URL,
					'Content-Type': 'application/json',
					'Permission-Policy': 'microphone=(self) camera=(self)',
					'Cross-Origin-Embedder-Policy': 'require-corp',
					'Cross-Origin-Opener-Policy': 'same-origin',
					'Cross-Origin-Resource-Policy': 'same-origin',
				},
			};
		// }

		console.log('ConfigData', config);
		response = await axios(config);

		let dataResponse = response.data;
		let headerResponse = response.headers;
		// console.log('apiUrl: ', apiUrl);
		// console.log('dataResponse: ', dataResponse);
		console.log(
			'response.headers.hasOwnProperty: ',
			response.headers.hasOwnProperty('newtoken'),
		);
		if (response.headers && response.headers.hasOwnProperty('newtoken')) {
			const newtoken = response.headers['newtoken'];

			storage.setItem(StorageKeys.TOKEN, newtoken);
		}
		if (shouldEnableEncryption) {
			let DecyptedRequestBody = JSON.parse(Decrypt(dataResponse?.data));
			// console.log("DecyptedRequestBody: ", DecyptedRequestBody)
			if (DecyptedRequestBody) {
				dataResponse.data = DecyptedRequestBody;
				responseBody = dataResponse as JsonResponseModel;
			}
		} else {
			responseBody = dataResponse as JsonResponseModel;
		}
	} catch (err: any) {
		console.log('Api   error: ', JSON.stringify(err));
		if (
			err?.response?.status == 401 ||
			err?.response?.data == 'Unauthorized' ||
			err?.response?.data?.message == 'Unauthorized'
		) {
			Alert.alert('Session Expired', 'Click ok to login again', [
				{
					text: 'OK',
					style: 'destructive',
					onPress: async () => await logoutUser(),
				},
			]);
		}
		// if (
		// err?.response?.data &&
		// (err?.response?.data?.message == 'INVALIDUSER' ||
		// err?.response?.data?.message == 'Unauthorized')
		// ) {
		// if (!global.isSessionExpiredAlertShown) {
		// global.isSessionExpiredAlertShown = true;
		// Alert.alert('Session expired. Please login again.', '', [
		// {
		// text: 'OK',
		// onPress: async () => {
		// await LogoutCleanup();
		// global.isSessionExpiredAlertShown = false;
		// },
		// },
		// ]);
		// }
		// } else if (
		// err?.response?.data &&
		// err?.response?.data?.message === 'Special characters not allowed'
		// ) {
		// Alert.alert('Special characters not allowed');

		// return;
		// }
	}
	return responseBody;
};
