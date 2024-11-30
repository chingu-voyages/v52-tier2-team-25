import { SecondaryButton } from "@/components/Secondarybutton"

export function Table () {
    return(
        <div id="table">
            <table className="w-[60rem] h-full border border-sky-100 rounded">
            <SecondaryButton label="Create appointment +"/>
                <tr className="border border-sky-100">
                    <th className="text-white border border-sky-100">Appt</th>
                    <th className="text-white border border-sky-100">Date</th>
                    <th className="text-white border border-sky-100">Time</th>
                </tr>
                <tr className="border border-sky-200">
                    <td className="text-white p-2 text-center border border-sky-200">solar removal</td>
                    <td className="text-white p-2 text-center border border-sky-200">Nov.30, 2024</td>
                    <td className="text-white p-2 text-center border border-sky-200">12.00 PM</td>
                </tr>
            </table>
        </div>
    )
}