import React from 'react';
import {motion} from "framer-motion";

const FreeHold = ()=>{
  return (
    <motion.div
    initial ={{width:0}}
    animate={{width : "95%"}}
    exit={{x:window.innerWidth , transition : {duration : 0.3}}}  
    style={{padding:"20px",borderTop:"2px solid gold"}}   
    >
        <div>
            <h1><strong>Freehold Land Tenure System in Uganda</strong></h1>
            <p>Freehold Land Tenure System is the way of owning land in Perpetuity or Time Without end and was set up by an agreement between the Kingdoms and the British Government. Grants of land in freehold were made by the Crown and later by the Uganda Land Commission. The grantee of land in freehold was and is entitled to a certificate of title. Most of this land was issued to church missionaries and academic Institutions and some individuals. Freehold is the premier mode of private land ownership under English law. Freehold tenure is among other four <strong>types of land tenure systems in Uganda</strong> under which people hold ownership of land.</p>
            <p>The Land Act recognizes it as one of the four regimes through which access to land rights may be obtained. Its incidents are defined to include registration of title in perpetuity and conferment of full powers of ownership that is the power of use, abuse and disposition. Transactions involving freehold land are governed by the Registration of Titles Act (Cap. 230). There is little land is held under freehold tenure in Uganda.<br />
            </p>
            <p><b>The 1998 Uganda Land Act defines ‘freehold tenure’ as a land tenure that develops its legitimacy from the Constitution and the written law.</b></p>
            <p>
            Freehold tenure might comprise of a grant of land ownership in eternity. The Land Act specifies that the freehold land holder has full powers of ownership over it. This implies that that person may use it for any legalized purpose like selling, letting, leasing and disposing it off by will or execute it in any way as he may deem it right and prudent. It is only Ugandan citizens that are legally entitled to own land under the freehold tenure system. Certificates of title for this tenure are pursued directly via government authorities which involve the Sub-county land office, the district land office plus the Ministry of Lands zonal offices.
            </p>
             <br />
             <p>
             Freehold land tenure is found across many parts of Uganda and people can convert the other land tenures (government or institutional leasehold and customary tenures) into freehold and get land titles from their district land offices.
             </p>
            
            <p>Freehold tenure has features of mailo land tenure and since there is no mailo tenure in many parts of the country apart from Buganda and a few sections of Ankole, people elsewhere go for freehold tenure and it provides security of unending ownership.</p>
            <p>Many financial institutions or money lenders also have great consideration for land titles of the freehold tenure system.</p>
            <p>The freehold tenure system was from the start set up to address limited requirements by religious institutions and was granted as a result of the Toro Agreement of 1900 and the 1901 Ankole Agreement.</p>
            <h3>How to acquire a Freehold Land Title?</h3>
            <p><strong>Step 1</strong><br />
            The Applicant must have in his/her possession of fully completed Forms 4, 10, 19, 23, a set of 3 authentic deed plans, 3 Passport Photographs, Receipts of Payment and a forwarding letter requesting for a Freehold title signed by the District Land Officer of the respective District where the land is located.</p>
            <p><strong>Step 2</strong><br />
            The Applicant then presents the full set of original documents in duplicate and a photocopy of the same, to the Department of Land Administration for Checking. The Photocopy is stamped ‘Received’ and returned to the Applicant. The Applicant checks with the Department of Land Administration after 10 working days to confirm their approval or rejection.</p>
            <p><strong>Step 3</strong><br />
            Once approved, the documents are forwarded to the Department of Land<br />
            Registration for issuance of a Freehold Land Title. The applicant checks after 20 working days.</p>
            <p><strong>Step 4</strong><br />
            The applicant presents the photocopy given to him/her by the Department of Land Administration stamped ‘Received’ and identification documents on collecting the Freehold Title. The applicant signs for the Title and the Photocopy is stamped ‘Returned’ on completion.</p>
            <p>Documents required: Form 4, 10, 19, 23, set of Deed Plans, set of Passport<br />
            photographs, General receipts of Payment and a Requesting letter.<br />
            Fees paid at the Ministry: Registration fees – 10,000; Assurance of Title –<br />
            20,000/=; issuance of the Title – 20,000/=.</p>
            <h2><strong>Other Land Tenure Systems in Uganda</strong></h2>
            <p>Besides the freehold tenure, Uganda has other land tenure systems under which land can be owned and used. These include <strong>Mailo land tenure system</strong>, <strong>leasehold tenure system</strong> and <strong>customary land tenure system in Uganda</strong>
            
             Under these tenure systems, property owners are issued with land titles which confirm ownership. Mailo land is issued with private mailo title, freehold also gets Freehold titles and well as Leasehold title for the leasehold tenure.</p>

            <p>Customary land tenure on the other has not titles since the land is owned communally by clans, tribes, families or communities. Demarcations under customary tenure are determined locals on the ground. Plant demarcations or tentative mark stones are common under this tenure. One chance with the customary tenure system is that it can be converted into freehold tenure after surveying and documentations. Once a freehold status is attained, then a leasehold arrangement can also be granted by the freehold title holder.</p>
                                                                                        </div>
    </motion.div>
  )
}

export default FreeHold;