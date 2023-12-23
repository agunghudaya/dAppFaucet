
const NETWORK_ID = 5777;

export const loadContract = async(
    name, 
    provider
) => {

    if (!NETWORK_ID) {
        return Promise.reject("Network ID is not defined!")
    }

    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();

    if (Artifact.networks[NETWORK_ID].address) {
        const contract = new provider.eth.Contract(
            Artifact.abi,
            Artifact.networks[NETWORK_ID].address
        )
        return contract;
    } else {
        return Promise.reject(`Contract: [${name}] cannot be loaded!`);
    }
}