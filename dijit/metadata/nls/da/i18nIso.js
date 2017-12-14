// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define({documentTypes:{data:{caption:"ISO 19115 (Data)",description:""},service:{caption:"ISO 19119 (Data)",description:""},gmi:{caption:"ISO 19115-2 (Billede- og gitterdata)",description:""}},general:{reference:"Reference"},sections:{metadata:"Metadata",identification:"Identifikation",distribution:"Distribution",quality:"Kvalitet",acquisition:"Overtagelse"},metadataSection:{identifier:"Identifikation",contact:"Kontakt",date:"Dato",standard:"Standard",reference:"Reference"},identificationSection:{citation:"Henvisning",description:"Beskrivelse",contact:"Kontakt",thumbnail:"Miniaturebillede",keywords:"Nøgleord",constraints:"Begrænsninger",resource:"Ressource",resourceTab:{representation:"Repræsentation",language:"Sprog",classification:"Klassifikation",extent:"Område"},serviceResourceTab:{serviceType:"Tjenestetype",extent:"Udstrækning",couplingType:"Koblingstype",operation:"Handling",operatesOn:"Fungerer på"}},distributionSection:{},qualitySection:{scope:"Omfang",conformance:"Overensstemmelse",lineage:"Herkomst"},acquisitionSection:{requirement:"Krav",objective:"Målsætning",instrument:"Instrument",plan:"Plan",operation:"Operation",platform:"Platform",environment:"Miljø"},AbstractMD_Identification:{sAbstract:"Referat",purpose:"Formål",credit:"Credits",pointOfContact:"Kontaktpunkt",resourceMaintenance:"Vedligeholdelse",graphicOverview:"Grafisk oversigt",descriptiveKeywords:"Nøgleordssamling",resourceConstraints:"Begrænsninger"},CI_Address:{deliveryPoint:"Leveringspunkt",city:"By",administrativeArea:"Administrativt område",postalCode:"Postnummer",country:"Land",electronicMailAddress:"E-mail-adresse"},CI_Citation:{title:"Titel",alternateTitle:"Alternativ titel",identifier:"Unique Resource Identifier",resource:{title:"Ressourcetitel",date:"Ressourcedato"},specification:{title:"Specifikationstitel",date:"Specifikationsdato"}},CI_Contact:{phone:"Telefon",address:"Adresse",onlineResource:"Onlineressource",hoursOfService:"Åbningstider for tjeneste",contactInstructions:"Kontaktvejledning"},CI_Date:{date:"Dato",dateType:"Datotype"},CI_DateTypeCode:{caption:"Datotype",creation:"Oprettelsesdato",publication:"Udgivelsesdato",revision:"Ændringsdato"},CI_OnLineFunctionCode:{caption:"Funktion",download:"Hent",information:"Oplysninger",offlineAccess:"Offline-adgang",order:"Rækkefølge",search:"Søg"},CI_OnlineResource:{caption:"Onlineressource",linkage:"URL",protocol:"Protokol",applicationProfile:"Applikationsprofil",name:"Navn",description:"Beskrivelse",sFunction:"Funktion"},CI_ResponsibleParty:{caption:"Kontaktpunkt",individualName:"Personnavn",organisationName:"Organisationsnavn",positionName:"Positionsnavn",contactInfo:"Kontaktoplysninger",role:"Rolle"},CI_RoleCode:{caption:"Rolle",resourceProvider:"Ressourceleverandør",custodian:"Inspektør",owner:"Ejer",user:"Bruger",distributor:"Distributør",originator:"Oprindelse",pointOfContact:"Kontaktpunkt",principalInvestigator:"Primær kontrollant",processor:"Behandler",publisher:"Udgiver",author:"Forfatter"},CI_Telephone:{voice:"Tale",facsimile:"Fax"},DCPList:{caption:"DCP",XML:"XML",CORBA:"CORBA",JAVA:"JAVA",COM:"COM",SQL:"SQL",WebServices:"Webtjenester"},DQ_ConformanceResult:{caption:"Overensstemmelsesresultat",explanation:"Forklaring",degree:{caption:"Grad",validationPerformed:"Validering udført",conformant:"Overensstemmende",nonConformant:"Ikke-overensstemmende"}},DQ_DataQuality:{report:"Rapport"},DQ_Scope:{level:"Omfang (kvalitetsoplysninger gælder for)",levelDescription:"Niveaubeskrivelse"},EX_Extent:{caption:"Område",description:"Beskrivelse",geographicElement:"Geografisk udstrækning",temporalElement:"Tidsbestemt udstrækning",verticalElement:"Vertikal udstrækning"},EX_GeographicBoundingBox:{westBoundLongitude:"Vestlig afgrænsende længdegrad",eastBoundLongitude:"Østlig afgrænsende længdegrad",southBoundLatitude:"Sydlig afgrænsende breddegrad",northBoundLatitude:"Nordlig afgrænsende breddegrad"},EX_GeographicDescription:{caption:"Geografisk beskrivelse"},EX_TemporalExtent:{TimePeriod:{beginPosition:"Startdato",endPosition:"Slutdato"}},EX_VerticalExtent:{minimumValue:"Minimumværdi",maximumValue:"Maksimumværdi",verticalCRS:"Vertikal CRS"},Length:{caption:"Længde",uom:"Måleenheder",km:"Kilometer",m:"Meter",mi:"Miles",ft:"Fod"},LI_Lineage:{statement:"Erklæring om herkomst"},MD_BrowseGraphic:{fileName:"Søg efter grafisk URL",fileDescription:"Søg efter grafisk billedtekst",fileType:"Søg efter grafisk type"},MD_ClassificationCode:{unclassified:"Íkke-klassificeret",restricted:"Begrænset",confidential:"Fortroligt",secret:"Hemmeligt",topSecret:"Tophemmeligt"},MD_Constraints:{caption:"Brugsbegrænsninger",useLimitation:"Brugsbegrænsning"},MD_DataIdentification:{spatialRepresentationType:"Geografisk visningstype",spatialResolution:"Geografisk opløsning",language:"Ressourcesprog",supplementalInformation:"Supplerende"},MD_DigitalTransferOptions:{onLine:"Online"},MD_Distribution:{distributionFormat:"Distributionsformat",transferOptions:"Overførselsindstillinger"},MD_Format:{name:"Formatnavn",version:"Formatversion"},MD_Identifier:{caption:"URI",identifierCaption:"Identifikation",code:"Kode"},MD_Keywords:{delimitedCaption:"Nøgleord",thesaurusName:"Tilknyttet tesaurus"},MD_KeywordTypeCode:{caption:"Nøgleordstype",discipline:"Disciplin",place:"Sted",stratum:"Lag",temporal:"Tidsbestemt",theme:"Tema"},MD_LegalConstraints:{caption:"Juridiske begrænsninger",accessConstraints:"Adgangsbegrænsninger",useConstraints:"Brug begrænsninger",otherConstraints:"Andre begrænsninger"},MD_MaintenanceFrequencyCode:{caption:"Frekvens",continual:"Kontinuerlig",daily:"Hver dag",weekly:"Hver uge",fortnightly:"Hver 14. dag",monthly:"Hver måned",quarterly:"Hver kvartal",biannually:"Hvert andet år",annually:"Årligt",asNeeded:"Efter behov",irregular:"Uregelmæssig",notPlanned:"Ikke planlagt",unknown:"Ukendt"},MD_Metadata:{caption:"Metadata",fileIdentifier:"Filidentifikation",language:"Metadatasprog",hierarchyLevel:"Hierarkisk niveau",hierarchyLevelName:"Hierarkisk niveaunavn",contact:"Metadatakontakt",dateStamp:"Metadatadato",metadataStandardName:"Metadatastandardnavn",metadataStandardVersion:"Metadatastandardversion",referenceSystemInfo:"Referencesystem",identificationInfo:"Identifikation",distributionInfo:"Distribution",dataQualityInfo:"Kvalitet"},MD_ProgressCode:{caption:"Statuskode",completed:"Fuldført",historicalArchive:"Historisk arkiv",obsolete:"Forældet",onGoing:"Igangværende",planned:"Planlagt",required:"Krævet",underDevelopment:"Under udvikling"},MD_RepresentativeFraction:{denominator:"Nævner"},MD_Resolution:{equivalentScale:"Ækvivalensskala",distance:"Afstand"},MD_RestrictionCode:{copyright:"Copyright",patent:"Patent",patentPending:"Patent afventer",trademark:"Varemærke",license:"Licens",intellectualPropertyRights:"Intellektuelle ejendomsrettigheder",restricted:"Begrænset",otherRestrictions:"Andre begrænsninger"},MD_ScopeCode:{attribute:"Attribut",attributeType:"Attributtype",collectionHardware:"Indsamlingshardware",collectionSession:"Indsamlingssession",dataset:"Datasæt",series:"Serier",nonGeographicDataset:"Ikke-geografisk datasæt",dimensionGroup:"Dimensionsgruppe",feature:"Objekt",featureType:"Objekttype",propertyType:"Egenskabstype",fieldSession:"Feltsession",software:"Software",service:"Tjeneste",model:"Model",tile:"Tile"},MD_ScopeDescription:{attributes:"Atributter",features:"Objekter",featureInstances:"Objektforekomster",attributeInstances:"Attributforekomster",dataset:"Datasæt",other:"Andet"},MD_SecurityConstraints:{caption:"Sikkerhedsbegrænsninger",classification:"Klassifikation",userNote:"Brugermedddelelse",classificationSystem:"Klassifikationssystem",handlingDescription:"Håndteringsbeskrivelse"},MD_SpatialRepresentationTypeCode:{caption:"Geografisk visningstype",vector:"Vektor",grid:"Gitter",textTable:"Teksttabel",tin:"TIN",stereoModel:"Stereomodel",video:"Video"},MD_TopicCategoryCode:{caption:"Emnekategori",boundaries:"Administrative og politiske grænser",farming:"Landbrug",climatologyMeteorologyAtmosphere:"Atmosfære og klima",biota:"Biologi og økologi",economy:"Forretning og økonomi",planningCadastre:"Matrikeloversigt",society:"Kultur, samfund og demografi",elevation:"Højdemåling og afledede produkter",environment:"Miljø og fredning",structure:"Anlæg og infrastruktur",geoscientificInformation:"Geologi og geofysik",health:"Sundhed og sygdom",imageryBaseMapsEarthCover:"Billeder og baggrundskort",inlandWaters:"Indenlandske vandressourcer",location:"GPS- og geodætiske netværk",intelligenceMilitary:"Militær",oceans:"Oceaner og flodmundinger",transportation:"Transportsystemer",utilitiesCommunication:"Offentlige værker og kommunikation"},MI_ContextCode:{caption:"Kontekst",acquisition:"Overtagelse",pass:"Pas",wayPoint:"Vejpunkt"},MI_EnvironmentalRecord:{caption:"Miljøforhold",averageAirTemperature:"Gennnemsnitlig lufttemperatur",maxRelativeHumidity:"Maksimal relativ fugtighed",maxAltitude:"Maksimal højde",meterologicalConditions:"Meteorologiske forhold"},MI_Event:{identifier:"Hændelsesidentifikation",time:"Tid",expectedObjectiveReference:"Forventet mål (målidentifiation)",relatedSensorReference:"Relateret sensor (instrumentidentifikation)",relatedPassReference:"Relateret passage (Platform Pass Identifer)"},MI_GeometryTypeCode:{point:"Punkt",linear:"Lineær",areal:"Areal",strip:"Stribe"},MI_Instrument:{citation:"Instrumenthenvisning",identifier:"Instrumentidentifikation",sType:"Instrumenttype",description:"Instrumentbeskrivelse",mountedOn:"Monteret på",mountedOnPlatformReference:"Monteret på (platformidentifikator)"},MI_Metadata:{acquisitionInformation:"Overtagelse"},MI_Objective:{caption:"Målsætning",identifier:"Målsætningsidentivikation",priority:"Målprioritet",sFunction:"Funktion for målsætning",extent:"Område",pass:"Platformoverførsel",sensingInstrumentReference:"Sensorinstrument (instrumentIdentifikator)",objectiveOccurrence:"Begivenheder",sections:{identification:"Identifikation",extent:"Område",pass:"Overførsel",sensingInstrument:"Sensorinstrument",objectiveOccurrence:"Begivenheder"}},MI_ObjectiveTypeCode:{caption:"Type (indsamlingsteknik for mål)",instantaneousCollection:"Øjeblikkelig indsamling",persistentView:"Vedvarende visning",survey:"Inspektion"},MI_Operation:{caption:"Handling",description:"Handlingsbeskrivelse",citation:"Handlingshenvisning",identifier:"Handlingsidentifikation",status:"Handlingsstatus",objectiveReference:"Relateret mål (målidentifikation)",planReference:"Relateret plan (planidentifikation)",significantEventReference:"Relateret hændelse (hændelsesidentifikation)",platformReference:"Related platform (platformsidentifikation)",sections:{identification:"Identifikation",related:"Relateret"}},MI_OperationTypeCode:{caption:"Handlingstype",real:"Virkelig",simulated:"Simuleret",synthesized:"Syntetiseret"},MI_Plan:{sType:"Eksempelgeometri for indsamlingsdata",status:"Status for planen",citation:"Henvisning til myndighed, der anmoder om indsamling",satisfiedRequirementReference:"Krav opfyldt (kravidentifikation)",operationReference:"Relateret handling (handlingsidentifikation)"},MI_Platform:{citation:"Platformhenvisning",identifier:"Platformidentifikation",description:"Beskrivelse af platform, der understøtter instrumentet",sponsor:"Sponsororganisation for platform",instrument:"Instrument(er), der er monteret på platform",instrumentReference:"Instrumentidentifikation",sections:{identification:"Identifikation",sponsor:"Sponsor",instruments:"Instrumenter"}},MI_PlatformPass:{identifier:"Platformoverførselsidentifikation",extent:"Platformoverførselsudstrækning",relatedEventReference:"Relateret hændelse (hændelsesidentifikation)"},MI_PriorityCode:{critical:"Kritisk",highImportance:"Stor betydning",mediumImportance:"Middel betydning",lowImportance:"Lille betydning"},MI_RequestedDate:{requestedDateOfCollection:"Anmodet indsamlingsdato",latestAcceptableDate:"Seneste acceptable dato"},MI_Requirement:{caption:"Krav",citation:"Henvisning til vejledningsmateriale vedr. krav",identifier:"Kravidentikation",requestor:"Kravanmoder",recipient:"Modtager af kravresultater",priority:"Kravprioritet",requestedDate:"Dato for anmodning",expiryDate:"Udløbsdato",satisifiedPlanReference:"Plan fuldført (planidentifikation)",sections:{identification:"Identifikation",requestor:"Anmoder",recipient:"Modtager",priorityAndDates:"Priorittet og datoer",satisifiedPlan:"Plan fuldført"}},MI_SequenceCode:{caption:"Sekvens",start:"Start",end:"Slut",instantaneous:"Øjeblikkelig"},MI_TriggerCode:{caption:"Udløser",automatic:"Automatisk",manual:"Manuel",preProgrammed:"Forprogrammeret"},ObjectReference:{uuidref:"UUID-reference",xlinkref:"URL-reference"},RS_Identifier:{caption:"ID Plus Code Space",code:"Kode",codeSpace:"Code Space"},SV_CouplingType:{loose:"Løs",mixed:"Blandet",tight:"Stram"},SV_OperationMetadata:{operationName:"Handlingsnavn",DCP:"DCP",connectPoint:"Tilslutningspunkt"},SV_ServiceIdentification:{serviceType:"ServiceType",couplingType:"Koblingstype",containsOperations:"Handlingsmetadata",operatesOn:"Fungerer på"},TM_Primitive:{indeterminatePosition:"Tidsubegrænset position",indeterminates:{before:"Før",after:"Efter",now:"Nu",unknown:"Ukendt"}},gemet:{concept:{gemetConceptKeyword:"GEMET Concept-nøgleord",tool:"Slå op...",dialogTitle:"GEMET - Concept-nøgleord",searchLabel:"Søg:",searchTip:"Søg GEMET"},theme:{tool:"Slå op...",dialogTitle:"GEMET - Inspire Data Theme"},ioerror:"Der opstod en fejl under kommunikation med GEMET-tjenesten: {url}",searching:"Søger efter GEMET...",noMatch:"Ingen matchende resultater fundet.",languages:{bg:"Bulgarsk",cs:"Tjekkisk",da:"Dansk",nl:"Hollandsk",en:"Engelsk",et:"Estisk",fi:"Finsk",fr:"Fransk",de:"Tysk",el:"Græsk",hu:"Ungarsk",ga:"Gælisk (irsk)",it:"Italiensk",lv:"Lettisk",lt:"Litauisk",mt:"Maltesisk",pl:"Polsk",pt:"Portugisisk",ro:"Rumænsk",sk:"Slovakisk",sl:"Slovensk",es:"Spansk",sv:"Svensk"}}});