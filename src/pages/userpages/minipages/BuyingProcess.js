import React from 'react';
import {motion} from "framer-motion";

function BuyingProcess(){
  return (
    <motion.div
    initial ={{width:0}}
    animate={{width : "95%"}}
    exit={{x:window.innerWidth , transition : {duration : 1}}} 
    style={{padding:"20px",borderTop:"2px solid gold"}}>
        <h3>Understanding the process of buying land in Uganda</h3>
        <p>Land in Uganda is riddled with conmen and fraudsters and the buying process most times takes a turn in an unimaginable direction.</p>
        <p>The article below is to enlighten you about the legal process of acquiring titled land in Uganda, and in this case, we are going to use a Private Mailo title</p>
        <p>In summary, the process of acquiring land legally in Uganda moves along these well-defined
        steps;</p>
        <ol>
            <li>A visit to the property.</li>
            <li>Carry out a search at the Ministry of lands</li>
            <li>Negotiation with the seller.</li>
            <li>Hire a surveyor to verify the land size</li>
            <li>Preparation of sale agreement and payments.</li>
            <li>Transfer of rights.</li>
            <li>Property valuation</li>
            <li>Payment of stamp duty</li>
            <li>Final payment and handover of the title.</li>
        </ol>
        <div>
            <h4>The Process In more Detail</h4>
            <ol>
                <li>
                    <strong>A visit to the property</strong>
                    <p>This is the first step to acquiring land in Uganda.</p>
                    <p>Getting to assess the physical, economic, and
                    social infrastructure of the area in which one would like to buy land. This visit will enable you to
                    access the leadership (L.C 1) and neighbors to ascertain ground ownership and in any case if
                    the land has any squatters or other occupants.</p> 
                    <p>Many make the mistake of buying land they haven’t visited and this has led to unending legal
                    battles and loss of lives.</p>  
                </li>
                <li>
                    <strong>Carry out a search at the ministry of lands zonal office.</strong>
                    <p>For this step, use the services of a lawyer to verify the authenticity of the title of ownership in
                    the land office.</p>
                    <p>All you will need a photocopy of the land title deed from the seller to carry on the
                    search properly.</p>
                    <p>The Lands office will offer a Search Report, which must show the names of the
                    owner in question plus other details as indicated on the title.</p>
                    <p>Based on how busy the land office is, it takes one day to 3 days to get search results as
                    feedback to a search application form attached with a title copy.</p>
                    <p>If you have no time you can verify the authenticity of the land title by using this system</p>
                    <p>This search assists the buyer
                        to ascertain the right property ownership, its genuineness, establish its existence plus
                        identifying the conditions, caveats, pending rates, or encumbrances on the title.</p>
                </li>
                <li>
                    <strong>Negotiation with the seller</strong>
                    <p>After ascertaining the proper ownership and provenance of the land in question, the buyer and
his client can then meet the seller and negotiate on how much to pay for the land.</p>
                    <p></p>
                    <p></p>
                </li>
                <li>
                    <strong>Hire a professional Surveyor to verify the size of the land.</strong>
                    <p>Verifying the property size before any transactions are very paramount.</p>
                    <p>Procure the services of a professional registered surveyor to carry out a topographic survey of the land and confirm to you the size and shape as indicated on the title.</p>
                    <p>The surveyor will also identify the land boundaries and mark stones. And then issue to you a survey report in respect of the land.</p>
                </li>
                <li>
                    <strong>Sale agreement</strong>
                    <p>This sale agreement will be drafted by the buyer with all terms and conditions agreed on by both parties. This will stipulate all the demarcations, sums, payment schedules, and implications.</p>
                </li>
                <li>
                    <strong>Payment of land rates</strong>
                    <p>Buyers must know the payment of rates on land is a legitimate requirement of landowners and the seller should clear any pendent rates on the property before completing the transaction.</p>
                    <p>And a seller should present a clearance certificate for the land before it is transferred to the buyer.</p>
                </li>
                <li>
                    <strong>Transfer Documents and Consent to transfer</strong>
                    <p>The lawyer of the seller organizes transfer documents to be executed by both parties.</p>
                    <p>These documents will only be accomplished following an issued consent to transfer by the commissioner of lands.</p>
                </li>
                <li>
                    <strong>Property Valuation</strong>
                    <p>An application for valuation is always made to the government valuer, who makes a site visit to
                    enable him or her to prepare the requisite valuation report all for purposes of Stamp Duty.</p>
                    <p>This duty is vital since it acts as a registration fee for the property.</p>
                    <p>The duty is determined by a professional government valuer and the valuation is to determine the true open market value of the as at the date of transfer.</p>
                    <p>The buyer has the responsibility of applying for the valuation of the land using the valuation form properly completed by the seller. The lands office uses such papers to fix the stamp duty payable.</p>
                </li>
                <li>
                    <strong>Payment of Stamp Duty</strong>
                    <p> The buyer has the obligation to pay the stamp duty, a tax levied on land transactions for registration and transfer purposes. </p>
                    <p>It is imperative to know that the registration of transfer at the lands office cannot be executed not until the stamp duty has been cleared with a receipt to prove so.</p>
                </li>
                <li>
                    <strong>Final Payment and Exchange of documents</strong>
                    <p>On receiving the completion documents from the seller, the buyer is obliged to pay to the seller the total balance on the purchase price to complete the registration of the documents following payment of the obligatory stamp duty.</p>
                    <p>Documents from the lawyers of the seller encompass the land’s original title deed, the signed and witnessed transfer documents into the buyer’s names, receipts indication paid-up land rents plus clearance certificate, and the consent to transfer.</p>
                    <p>When the proper steps and due diligence are carried out, the chances of fraud are limited. </p>
                    <p>However, it is always imperative to use the services of a Land Lawyer who can advise on the nitty-gritty of the law.</p>
                </li>
            </ol>
            
            
            
        </div>
    </motion.div>
  )
}

export default BuyingProcess;