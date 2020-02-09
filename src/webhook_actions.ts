import { dialogflow, Permission, List, BasicCard, Button, SimpleResponse, Image, BrowseCarousel, BrowseCarouselItem, Dialogflow } from "actions-on-google";
// import { getTrashTimeByName, getTrashTimeByLocation } from "./response"
// import { TrashLine } from "./const";
import { getDrugStoreByLocation, addressToGeo } from "./utils"

export default function (request: Express.Request, response: Express.Response) {
    const app = dialogflow({ debug: false });
    app.intent([
        "Default Welcome Intent",
        "where to buy"], async (conv: any) => {

            console.log("where to buy")
            conv.data.requestedPermission =
                conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')
                    ? 'DEVICE_PRECISE_LOCATION'
                    : 'DEVICE_COARSE_LOCATION';
            console.log("conv.user.storage.location", conv.user.storage.location, conv.data.requestedPermission)
            conv.user.storage.location = null;
            return conv.ask(new Permission({
                context: "因為要查附近健保藥局的資訊",
                permissions: conv.data.requestedPermission,
            }));
        })
    app.intent('handle_permission', async (conv: any, params, permissionGranted) => {
        console.log('handle_permission', permissionGranted, conv.data)
        if (!permissionGranted) {
            console.log('handle_permission no')

            throw new Error('Permission not granted');
        }
        const { requestedPermission } = conv.data;

        if (requestedPermission === 'DEVICE_COARSE_LOCATION') {

            if (conv.device.location.city === undefined) {
                conv.ask("抱歉，無法取得此裝置的所在城市!")
                return conv.close()
            } else {
                try {
                    conv.user.storage.location = await addressToGeo(conv.device.location.city);
                    return getDrugStoreList(conv)
                } catch (err) {
                    console.log(err)
                    conv.ask("抱歉，暫時無法使用ＡＰＩ")
                    return conv.close()
                }
            }
        }
        if (requestedPermission === 'DEVICE_PRECISE_LOCATION') {
            const { coordinates } = conv.device.location;
            conv.user.storage.location = coordinates;
            return getDrugStoreList(conv)

        }
        throw new Error('Unrecognized permission');
    });


    const getDrugStoreList = async (conv: any) => {
        let { longitude, latitude } = conv.user.storage.location;
        let list: Array<any> = await getDrugStoreByLocation(longitude, latitude) as Array<any>;
        let t = list.length === 0 ? "目前您住家附近藥局全無口罩了! 明天再試試!" : `附近口罩資訊如下：${list.map(i => `${i.name}  ${i.phone} ${i.address} 成人尚有${i.mask_adult}個，小孩尚有${i.mask_child}個`)}`
        if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
            return conv.close(t)
        }
        let items = list.map(i => {
            let url = `https://www.google.com/maps/dir/?api=1&dir_action=navigate&destination=${i.geometry.coordinates[1]},${i.geometry.coordinates[0]}`;
            let description = `成人尚有${i.mask_adult}個，小孩尚有${i.mask_child}個`;

            return new BrowseCarouselItem({
                title: `${i.name} ${i.phone}`,
                url,
                description,
                footer: `${Math.abs(i.distance * 1000).toFixed(0)}公尺 ${i.address}`,
            })
        })

        conv.ask(new SimpleResponse({
            speech: t,
            text: `附近口罩資訊如下： 您可點擊下列按紐直接開啟導航。`,
        }));

        conv.ask(new BrowseCarousel({
            items
        }))
        return conv.close();
    }

    app(request, response)
}