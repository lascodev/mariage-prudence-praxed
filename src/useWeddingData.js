import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  doc, getDoc, setDoc, onSnapshot, collection,
  addDoc, updateDoc, deleteDoc, query, orderBy
} from "firebase/firestore";

// Données par défaut
export const DEFAULT_DATA = {
  couple: {
    nom1: "Prudence", nom2: "Praxèd",
    date1: "2026-07-09", label1: "Mariage Coutumier",
    date2: "2026-07-11", label2: "Mariage Civil",
    histoire: "C'est après 16 années d'amour et de tendresse que nous avons décidé de nous dire oui pour toujours, dans un cadre idyllique. Nous avons hâte de partager ce nouveau chapitre avec vous.",
    photographe: "Id'Art",
  },
  programme: [
    { id:"p1", date:"Jeu 9 Juil", time:"10h00", icon:"🌿", title:"Mariage Coutumier", desc:"Célébration traditionnelle en famille", duration:"Toute la journée" },
    { id:"p2", date:"Sam 11 Juil", time:"10h00", icon:"⛪", title:"Cérémonie Religieuse", desc:"Église — Bénédiction des mariés", duration:"1h30" },
    { id:"p3", date:"Sam 11 Juil", time:"14h00", icon:"📋", title:"Mariage Civil", desc:"Mairie — Officialisation de l'union", duration:"1h" },
    { id:"p4", date:"Sam 11 Juil", time:"19h00", icon:"🍽️", title:"Dîner de Gala", desc:"Soirée festive — Musique & Danse", duration:"∞" },
  ],
  infos: [
    { id:"i1", icon:"📍", title:"Lieu de la réception", content:"À confirmer\nLibreville, Gabon", color:"#fdf0e6" },
    { id:"i2", icon:"👗", title:"Code vestimentaire", content:"Tenue de soirée exigée\nCouleurs : blanc, or, champagne", color:"#f0f6e6" },
    { id:"i3", icon:"🚗", title:"Transport", content:"Navette disponible sur demande\nParking sur place", color:"#e6f0f6" },
    { id:"i4", icon:"ℹ️", title:"RSVP avant le", content:"30 juin 2026\nContactez les mariés pour toute question", color:"#f6e6f0" },
  ],
  invites: [
    { id:"inv1", name:"Marie Nzamba", table:1, confirmed:true, meal:"Viande" },
    { id:"inv2", name:"Jean Mba", table:1, confirmed:true, meal:"Poisson" },
    { id:"inv3", name:"Cécile Obame", table:2, confirmed:false, meal:"" },
    { id:"inv4", name:"Patrick Nguema", table:2, confirmed:true, meal:"Végétarien" },
  ],
  tables: [
    { id:"t1", name:"Table des Mariés", guests:["Prudence","Praxèd","Marie Nzamba","Jean Mba"] },
    { id:"t2", name:"Table Famille", guests:["Cécile Obame","Patrick Nguema"] },
  ],
  menus: [
    { id:"m1", icon:"🍖", name:"Menu Viande", desc:"Plat traditionnel gabonais & viande grillée" },
    { id:"m2", icon:"🐟", name:"Menu Poisson", desc:"Poisson braisé sauce légumes du terroir" },
    { id:"m3", icon:"🌿", name:"Menu Végétarien", desc:"Légumes mijotés, riz parfumé aux épices" },
  ],
  messages: [
    { id:"msg1", name:"La famille Nzamba", msg:"Après 16 ans d'amour, vous méritez ce bonheur ! 🙏💕", time:"10h00", approved:true },
  ],
};

// Hook principal — écoute les changements Firebase en temps réel
export function useWeddingData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écoute le document principal en temps réel
    const unsub = onSnapshot(doc(db, "wedding", "main"), async (snap) => {
      if (snap.exists()) {
        setData(snap.data());
      } else {
        // Première fois : initialise avec les données par défaut
        await setDoc(doc(db, "wedding", "main"), DEFAULT_DATA);
        setData(DEFAULT_DATA);
      }
      setLoading(false);
    }, (err) => {
      console.error("Firebase error:", err);
      setData(DEFAULT_DATA);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Sauvegarde une section dans Firebase
  const saveSection = async (section, value) => {
    try {
      await updateDoc(doc(db, "wedding", "main"), { [section]: value });
      return true;
    } catch (err) {
      console.error("Save error:", err);
      return false;
    }
  };

  return { data, loading, saveSection };
}
