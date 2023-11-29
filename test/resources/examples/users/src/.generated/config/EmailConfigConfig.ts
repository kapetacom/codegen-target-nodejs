import Config from "@kapeta/sdk-config";

export interface EmailConfigConfig {
    from: string;
}

export const getEmailConfigConfig = (
    defaultValue: EmailConfigConfig
): EmailConfigConfig => {
    return Config.getOrDefault<EmailConfigConfig>("EmailConfig", defaultValue);
};
