import { SecondaryButton } from "@/components/Secondarybutton"

export function Table () {
    return(
        <div id="table">
            <table className="w-full h-full">
            <SecondaryButton label="Create appointment +"/>
                <tr>
                    <th className="text-white">Appt</th>
                    <th className="text-white">Date</th>
                    <th className="text-white">Time</th>
                </tr>
            </table>
        </div>
    )
}