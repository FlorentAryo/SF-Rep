<aura:component implements="force:appHostable,flexipage:availableForAllPageTypes,flexipage:availableForRecordHome,force:hasRecordId,forceCommunity:availableForAllPageTypes,force:lightningQuickAction" access="global" controller="Marquee">
	<!-- Attributes -->
    <aura:attribute name="txt" type="String" />
    
    <!-- Initializer -->
    <aura:handler name="init" action="{!c.doInit}" value="{!this}"/>
    
    <div class="marquee" >
        <p>
            {!v.txt}
        </p>
    </div>

</aura:component>
