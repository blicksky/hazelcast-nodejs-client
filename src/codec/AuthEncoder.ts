import ClientMessage = require("../ClientMessage");
import AuthRequest = require("../messages/auth/AuthRequest");
import {SizeUtil} from "./Utils"

class AuthEncoder {
    public static encodeRequest(request:AuthRequest):ClientMessage {
        var clientMessage = ClientMessage.newClientMessage(this.calculateSize(request));
        clientMessage.setMessageType(0x02);
        clientMessage.appendString(request.group);
        clientMessage.appendString(request.password);
        clientMessage.appendBoolean(request.ownerConnection);

        var uuid = request.uuid;
        var isUuidNull = uuid == null;
        clientMessage.appendBoolean(isUuidNull);
        if (!isUuidNull) {
            clientMessage.appendString(uuid);
        }

        var ownerUuid = request.ownerUuid;
        var isOwnerUuidNull = ownerUuid == null;
        clientMessage.appendBoolean(isOwnerUuidNull);
        if (!isOwnerUuidNull) {
            clientMessage.appendString(ownerUuid);
        }


        clientMessage.appendString(request.clientType);
        clientMessage.appendUint8(request.serializationVersion);
        return clientMessage;
    }

    private static calculateSize(request:AuthRequest):number {
        var size = 0;

        size += SizeUtil.getStringSize(request.group);
        size += SizeUtil.getStringSize(request.password);


        size += SizeUtil.getStringSize(request.uuid, true);
        size += SizeUtil.getStringSize(request.ownerUuid, true);

        // ownerConnection
        size += 1;


        size += SizeUtil.getStringSize(request.clientType);
        // serializationVersion
        size += 1;

        return size;
    }

}

export = AuthEncoder
