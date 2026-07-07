import os
import requests

# ==============================================================================
# CONFIGURAÇÕES DO OPENROUTER + ELEVENLABS (SOTA TTS)
# ==============================================================================
# Chave de API do OpenRouter
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "SUA_API_KEY_OPENROUTER_AQUI")

# Modelo SOTA de TTS da ElevenLabs roteado pelo OpenRouter
# ElevenLabs é o líder indiscutível em síntese de voz natural e expressiva.
MODEL_ID = "elevenlabs/eleven-turbo-v2"

# IDs das vozes oficiais da ElevenLabs que suportam português brasileiro (pt-BR)
# Você pode alterá-los por outros IDs de voz da biblioteca da ElevenLabs
ELEVENLABS_VOICES = {
    "narrator": "pNInz6obpgqjVWtJ45ng",  # Marcus - Voz narrativa profunda e clássica
    "ishaan": "EXAVITQu4vr4xnSDxMaL",    # Bella/Gigi - Voz jovem, expressiva para crianças
    "nikumbh": "AZnzlk1XvdvUeBnXmlld",   # Domi - Voz calorosa, entusiasmada e encorajadora
    "strict": "N2l5iaCqiJD14Kx8yTWv",    # George - Voz severa, imponente e punitiva
    "father": "ODq5zmih86Wj9AD6Hn65",    # Arnold - Voz masculina forte, firme e madura
    "brother": "IKne3meq5aBk9saAMt7s",   # Charlie - Voz de garoto jovem/adolescente
    "principal": "VR6AupYg3I4dm5v3vs9f", # Bill - Voz de senhor, lenta e formal
    "rajan": "bV5qZ46g2G0oT5eT4U4c",     # Liam - Voz jovem e amigável
    "turma": "EXAVITQu4vr4xnSDxMaL",     # Voz geral zombeteira
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
# FUNÇÃO DE GERAÇÃO VIA OPENROUTER AUDIO SPEECH API
# ==============================================================================

def generate_voice_openrouter(text, voice_id, filepath):
    """Gera áudio usando a API do OpenRouter roteando para ElevenLabs."""
    if OPENROUTER_API_KEY == "SUA_API_KEY_OPENROUTER_AQUI":
        raise ValueError("Chave de API do OpenRouter não configurada.")
        
    url = "https://openrouter.ai/api/v1/audio/speech"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Payload compatível com a API de áudio da OpenAI, roteado para a ElevenLabs
    data = {
        "model": MODEL_ID,
        "input": text,
        "voice": voice_id,
        "response_format": "mp3"
    }
    
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        with open(filepath, "wb") as f:
            f.write(response.content)
        return True
    else:
        print(f"Erro no OpenRouter TTS: {response.status_code} - {response.text}")
        return False

# ==============================================================================
# EXECUÇÃO PRINCIPAL
# ==============================================================================

def main():
    # Cria o diretório de saída
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Salvando arquivos de áudio em: {OUTPUT_DIR}\n")
    
    if OPENROUTER_API_KEY == "SUA_API_KEY_OPENROUTER_AQUI":
        print("[AVISO] Chave do OpenRouter não configurada.")
        print("Por favor, defina a variável OPENROUTER_API_KEY ou insira-a no script.")
        return

    success_count = 0
    fail_count = 0

    print(f"Iniciando a geração de áudio via OpenRouter com o modelo ElevenLabs '{MODEL_ID}'...\n")
    
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
            
            voice_id = ELEVENLABS_VOICES.get(speaker, ELEVENLABS_VOICES["narrator"])
            
            print(f"  -> Gerando fala {idx} ({speaker}): \"{clean_text[:40]}...\"")
            
            try:
                success = generate_voice_openrouter(clean_text, voice_id, filepath)
                if success:
                    print(f"    [Sucesso] Salvo em {filename}")
                    success_count += 1
                else:
                    print(f"    [Falhou] Erro ao gerar {filename}")
                    fail_count += 1
            except Exception as e:
                print(f"    [Erro] Exceção ao gerar {filename}: {e}")
                fail_count += 1
                
        print("-" * 50)
        
    print(f"\nGeração concluída! Sucesso: {success_count} | Falhas: {fail_count}")

if __name__ == "__main__":
    main()
