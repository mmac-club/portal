export const registerParticipant = async (req, res, next) => {
    try {
        console.log("--- Call for User Participation ---")
        console.log(req)
    }
    catch (error) {
        next(error)
    }
}