import os
import requests

# ==============================================================================
# CONFIGURAÇÕES DA API NATIVA DA ELEVENLABS
# ==============================================================================
# Chave de API da ElevenLabs
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY", "SUA_API_KEY_ELEVENLABS_AQUI")

# Modelo sugerido para Narrativas e Emoções em Português:
# - "eleven_multilingual_v2": O padrão ouro para expressividade e atuação dramática em múltiplos idiomas.
# - "eleven_turbo_v2_5": Super rápido e muito bom, mas com leve perda de expressividade dramática profunda.
MODEL_ID = "eleven_multilingual_v2"

# Mapeamento de IDs de Vozes da ElevenLabs (pt-BR / Altamente Expressivos)
# Você pode alterá-los por outros IDs de voz da biblioteca oficial ou por vozes clonadas no seu VoiceLab
ELEVENLABS_VOICES = {
    "narrator": "pNInz6obpgqjVWtJ45ng",  # Marcus - Profundo, profissional, ideal para documentários
    "ishaan": "EXAVITQu4vr4xnSDxMaL",    # Gigi/Bella - Voz jovem, de tom infantil e alta carga emocional
    "nikumbh": "AZnzlk1XvdvUeBnXmlld",   # Domi - Voz de mentor, calorosa, animada e inspiradora
    "strict": "N2l5iaCqiJD14Kx8yTWv",    # George - Voz imponente, rígida, ríspida
    "father": "ODq5zmih86Wj9AD6Hn65",    # Arnold - Voz firme, madura e autoritária
    "brother": "IKne3meq5aBk9saAMt7s",   # Charlie - Voz jovem adolescente
    "principal": "VR6AupYg3I4dm5v3vs9f", # Bill - Voz mais velha, formal, burocrática
    "rajan": "bV5qZ46g2G0oT5eT4U4c",     # Liam - Voz jovem e amigável
    "turma": "EXAVITQu4vr4xnSDxMaL",     # Voz genérica (para falas em grupo)
}

# Configurações de Voz customizadas por personagem para maximizar o efeito dramático
VOICE_SETTINGS = {
    "narrator": {
        "stability": 0.65,          # Narração estável, firme, sem oscilações
        "similarity_boost": 0.75,
        "style": 0.05,
        "use_speaker_boost": True
    },
    "ishaan": {
        "stability": 0.35,          # Instabilidade baixa para permitir que a voz trema de choro ou se empolgue
        "similarity_boost": 0.80,
        "style": 0.20,              # Mais exagero do estilo para aumentar o drama infantil
        "use_speaker_boost": True
    },
    "nikumbh": {
        "stability": 0.50,          # Equilíbrio entre expressividade e consistência
        "similarity_boost": 0.75,
        "style": 0.10,
        "use_speaker_boost": True
    },
    "strict": {
        "stability": 0.45,          # Dinâmico para permitir tom de grito/imposição
        "similarity_boost": 0.70,
        "style": 0.15,
        "use_speaker_boost": True
    },
    "father": {
        "stability": 0.55,
        "similarity_boost": 0.75,
        "style": 0.10,
        "use_speaker_boost": True
    },
    "brother": {
        "stability": 0.50,
        "similarity_boost": 0.75,
        "style": 0.10,
        "use_speaker_boost": True
    },
    "principal": {
        "stability": 0.60,
        "similarity_boost": 0.75,
        "style": 0.05,
        "use_speaker_boost": True
    },
    "rajan": {
        "stability": 0.50,
        "similarity_boost": 0.75,
        "style": 0.05,
        "use_speaker_boost": True
    },
    "turma": {
        "stability": 0.40,
        "similarity_boost": 0.70,
        "style": 0.15,
        "use_speaker_boost": True
    }
}

# Diretório de saída para os arquivos de áudio
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "audio", "voices")

# ==============================================================================
# BANCO DE DADOS DE FALAS (Extraído de scenes.js)
# ==============================================================================
SCENES_DATA = {
    # Cenas de introdução e fechamento
    "intro": [
        ("narrator", "A institucionalização do ensino e as barreiras no acesso à educação inclusiva. Quando a escola se organiza como uma instituição padronizada, com um único método, um único ritmo e uma única forma de avaliar, ela própria levanta obstáculos para quem aprende diferente. A partir do filme Como Estrelas na Terra, este curta observa como essas barreiras se erguem na trajetória de Ishaan, um menino com dislexia, e o que é preciso para derrubá-las.")
    ],
    "close": [
        ("narrator", "As barreiras à educação inclusiva são, antes de tudo, institucionais. Quando a escola padronizada, compara e segrega, é ela que ergue os obstáculos atitudinais, pedagógicos, estruturais e de acesso que impedem muitas crianças de aprender. Incluir não é consertar a criança, nem depender da sorte de um bom professor: é a instituição derrubar as próprias barreiras e garantir, como direito, o acesso de todas as crianças à educação.")
    ],
    
    # Cenas com falas de personagens e narrações correspondentes
    "wonder": [
        ("narrator", "Esse é o Ishaan. Um menino que enxerga o mundo cheio de cores."),
        ("ishaan", "Olha só... as estrelas!")
    ],
    "streets": [
        ("ishaan", "Olha aquela poça d'água... parece um espelho de cores!"),
        ("narrator", "Nas ruas, ele encontra o aprendizado que a escola rígida lhe nega.")
    ],
    "classroom": [
        ("strict", "Ishaan Awasthi! Fique de pé e leia a próxima frase!"),
        ("ishaan", "As letras... ficam dançando na minha frente."),
        ("turma", "Ahahaha! Ele não sabe ler! Que burro!"),
        ("strict", "Silêncio! Ishaan, leia direito! Por que você não presta atenção?"),
        ("narrator", "A dificuldade dele é tratada como preguiça ou indisciplina. A instituição ergue a barreira atitudinal.")
    ],
    "complaint": [
        ("principal", "O Ishaan não acompanha a turma. Sugiro que procurem outra escola."),
        ("father", "Mas diretor, deve haver alguma solução..."),
        ("narrator", "A escola descarta o aluno em vez de se adaptar.")
    ],
    "compare": [
        ("brother", "Tirei dez de novo!"),
        ("narrator", "E o Ishaan é cobrado o tempo todo pra ser igual ao irmão.")
    ],
    "father_anger": [
        ("father", "Você só quer saber de brincadeira! Não tem vergonha desse boletim?"),
        ("ishaan", "Eu... eu juro que tentei..."),
        ("narrator", "A frustração se transforma em barreira dentro de casa.")
    ],
    "farewell": [
        ("ishaan", "Mãe, por favor, não me deixa aqui... eu vou ser bonzinho!"),
        ("narrator", "A dor da separação e o sentimento de abandono.")
    ],
    "gate": [
        ("ishaan", "Eu só queria voltar pra casa..."),
        ("narrator", "No internato, o menino vai se fechando.")
    ],
    "strict_school": [
        ("strict", "Fique de pé! Como não consegue ler este texto simples?"),
        ("ishaan", "As letras... elas fogem..."),
        ("narrator", "A rigidez escolar pune a dificuldade com humilhação.")
    ],
    "rajan": [
        ("rajan", "Oi, eu sou o Rajan. Posso me sentar com você?"),
        ("ishaan", "Oi... pode sim."),
        ("narrator", "A empatia surge onde a exclusão reina.")
    ],
    "depression": [
        ("narrator", "Ishaan perde a vontade de desenhar. Ele se fecha num poço de silêncio."),
        ("ishaan", "Eu sou um peso para todo mundo...")
    ],
    "teacher": [
        ("nikumbh", "Cada criança aprende do seu jeito. Inclusive você."),
        ("narrator", "A chegada do professor muda tudo.")
    ],
    "bum_bum_bole": [
        ("nikumbh", "Bum Bum Bole! Vamos cantar, dançar e pintar a vida!"),
        ("narrator", "A alegria entra na sala de aula pela primeira vez.")
    ],
    "empty_notebook": [
        ("nikumbh", "Por que seu caderno está em branco, Ishaan? Não quer desenhar?"),
        ("narrator", "Nikumbh percebe o sofrimento invisível atrás do silêncio.")
    ],
    "parents_house": [
        ("nikumbh", "Olhem estes quadros! O Ishaan é um artista brilhante. Ele só precisa de tempo."),
        ("narrator", "O professor reconecta a escola com a realidade do aluno.")
    ],
    "father_meeting": [
        ("nikumbh", "Leia isso em japonês! Não consegue? É assim que o Ishaan se sente todo dia."),
        ("father", "Eu... eu não sabia..."),
        ("narrator", "Derrubando os preconceitos familiares.")
    ],
    "principal_office": [
        ("nikumbh", "Diretor, se o avaliarmos oralmente e dermos apoio, ele vai conseguir."),
        ("principal", "De acordo. Vamos dar uma chance ao menino."),
        ("narrator", "A gestão escolar se abre para a flexibilização curricular.")
    ],
    "tutoring": [
        ("nikumbh", "Vamos transformar as letras numa brincadeira."),
        ("ishaan", "Eu consegui... eu li!")
    ],
    "sand_writing": [
        ("nikumbh", "Sinta a forma da letra na areia, Ishaan. Desenhe devagar."),
        ("ishaan", "É como desenhar na praia... eu consigo!"),
        ("narrator", "A educação multissensorial garante o direito de aprender.")
    ],
    "cards": [
        ("nikumbh", "Einstein, Picasso, Leonardo da Vinci... todos eram disléxicos.")
    ],
    "easel": [
        ("ishaan", "Eu pintei isso!"),
        ("narrator", "E a escola, enfim, enxerga o que ele tem de melhor.")
    ],
    "paintings_reveal": [
        ("principal", "O vencedor do concurso de pintura é... Ishaan Awasthi!"),
        ("narrator", "A escola aplaude o talento que antes rejeitava.")
    ],
    "final_hug": [
        ("father", "Obrigado, professor. Você salvou meu filho."),
        ("ishaan", "Professor Nikumbh! Obrigado!"),
        ("nikumbh", "Voe alto, Ishaan! Voe alto!")
    ]
}

# ==============================================================================
# FUNÇÃO DE GERAÇÃO NATIVA ELEVENLABS
# ==============================================================================

def generate_voice_native(text, speaker, filepath):
    """Gera áudio chamando diretamente a API nativa da ElevenLabs com configurações finas."""
    if ELEVENLABS_API_KEY == "SUA_API_KEY_ELEVENLABS_AQUI":
        raise ValueError("Chave de API da ElevenLabs não configurada.")
        
    voice_id = ELEVENLABS_VOICES.get(speaker, ELEVENLABS_VOICES["narrator"])
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }
    
    # Obtém as configurações específicas de expressividade para este personagem
    settings = VOICE_SETTINGS.get(speaker, VOICE_SETTINGS["narrator"])
    
    data = {
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": settings
    }
    
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        with open(filepath, "wb") as f:
            f.write(response.content)
        return True
    else:
        print(f"Erro na ElevenLabs API ({response.status_code}): {response.text}")
        return False

# ==============================================================================
# EXECUÇÃO PRINCIPAL
# ==============================================================================

def main():
    # Cria o diretório de saída
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Diretório de saída: {OUTPUT_DIR}\n")
    
    if ELEVENLABS_API_KEY == "SUA_API_KEY_ELEVENLABS_AQUI":
        print("[AVISO] Chave de API da ElevenLabs não foi configurada.")
        print("Por favor, defina a variável ELEVENLABS_API_KEY ou insira-a no script.")
        return

    success_count = 0
    fail_count = 0

    print(f"Iniciando geração de áudio nativo via ElevenLabs API (Modelo: {MODEL_ID})...\n")
    
    for scene_key, lines in SCENES_DATA.items():
        print(f"Processando cena: {scene_key} ({len(lines)} falas)")
        
        for idx, (speaker, text) in enumerate(lines):
            # Limpa tags HTML simples
            clean_text = text.replace("<b>", "").replace("</b>", "").replace("<i>", "").replace("</i>", "")
            filename = f"{scene_key}_{idx}_{speaker}.mp3"
            filepath = os.path.join(OUTPUT_DIR, filename)
            
            if os.path.exists(filepath):
                print(f"  [Ignorado] {filename} já existe.")
                success_count += 1
                continue
            
            print(f"  -> Gerando {filename} ({speaker}): \"{clean_text[:40]}...\"")
            
            try:
                success = generate_voice_native(clean_text, speaker, filepath)
                if success:
                    print(f"    [Sucesso] Áudio salvo!")
                    success_count += 1
                else:
                    print(f"    [Falhou] Erro ao gerar fala.")
                    fail_count += 1
            except Exception as e:
                print(f"    [Erro] Exceção durante a geração: {e}")
                fail_count += 1
                
        print("-" * 50)
        
    print(f"\nGeração concluída! Sucesso: {success_count} | Falhas: {fail_count}")

if __name__ == "__main__":
    main()
