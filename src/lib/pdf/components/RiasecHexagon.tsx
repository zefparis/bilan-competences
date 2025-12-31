/**
 * PERSPECTA PDF - Composant RiasecHexagon
 * Hexagone de Holland pour visualiser le profil RIASEC
 */

import React from 'react';
import { View, Text, Svg, Polygon, Circle, G, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, riasecLabels, RiasecCode } from '../styles/tokens';

interface RiasecHexagonProps {
  scores: {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
  };
  dominant: RiasecCode[];
  size?: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    marginBottom: spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  legendText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[600],
  },
  legendScore: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xs,
    color: colors.neutral[800],
    marginLeft: 2,
  },
  dominantCode: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes['2xl'],
    color: colors.primary.darkBlue,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  dominantLabel: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    textAlign: 'center',
  },
});

export const RiasecHexagon: React.FC<RiasecHexagonProps> = ({
  scores,
  dominant,
  size = 200,
}) => {
  const center = size / 2;
  const maxRadius = size * 0.4;
  const labelRadius = size * 0.48;

  // Positions des 6 sommets (R en haut, puis sens horaire)
  const angles = [
    -90,  // R (haut)
    -30,  // I (haut-droite)
    30,   // A (bas-droite)
    90,   // S (bas)
    150,  // E (bas-gauche)
    210,  // C (haut-gauche)
  ];

  const codes: RiasecCode[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  const getPoint = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  // Points de l'hexagone de fond (100%)
  const backgroundPoints = angles
    .map((angle) => {
      const p = getPoint(angle, maxRadius);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  // Points du profil utilisateur
  const profilePoints = codes
    .map((code, i) => {
      const score = scores[code] / 100;
      const radius = maxRadius * Math.max(0.1, score);
      const p = getPoint(angles[i], radius);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  // Grilles intermédiaires (25%, 50%, 75%)
  const gridLevels = [0.25, 0.5, 0.75];

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grilles de fond */}
        {gridLevels.map((level, idx) => {
          const gridPoints = angles
            .map((angle) => {
              const p = getPoint(angle, maxRadius * level);
              return `${p.x},${p.y}`;
            })
            .join(' ');
          return (
            <Polygon
              key={idx}
              points={gridPoints}
              fill="none"
              stroke={colors.neutral[200]}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Hexagone de fond (100%) */}
        <Polygon
          points={backgroundPoints}
          fill={colors.neutral[100]}
          stroke={colors.neutral[300]}
          strokeWidth={1}
        />

        {/* Lignes du centre vers les sommets */}
        {angles.map((angle, idx) => {
          const p = getPoint(angle, maxRadius);
          return (
            <G key={`line-${idx}`}>
              <Polygon
                points={`${center},${center} ${p.x},${p.y}`}
                stroke={colors.neutral[200]}
                strokeWidth={0.5}
              />
            </G>
          );
        })}

        {/* Profil utilisateur */}
        <Polygon
          points={profilePoints}
          fill={`${colors.primary.blue}40`}
          stroke={colors.primary.blue}
          strokeWidth={2}
        />

        {/* Points sur le profil */}
        {codes.map((code, i) => {
          const score = scores[code] / 100;
          const radius = maxRadius * Math.max(0.1, score);
          const p = getPoint(angles[i], radius);
          const isDominant = dominant.includes(code);
          return (
            <Circle
              key={code}
              cx={p.x}
              cy={p.y}
              r={isDominant ? 6 : 4}
              fill={isDominant ? colors.riasec[code] : colors.primary.blue}
            />
          );
        })}
      </Svg>

      {/* Labels autour de l'hexagone */}
      <View style={styles.legendContainer}>
        {codes.map((code) => (
          <View key={code} style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: colors.riasec[code] },
              ]}
            />
            <Text style={styles.legendText}>
              {code} - {riasecLabels[code]}
            </Text>
            <Text style={styles.legendScore}>{scores[code]}%</Text>
          </View>
        ))}
      </View>

      {/* Code dominant */}
      <Text style={styles.dominantCode}>{dominant.join('')}</Text>
      <Text style={styles.dominantLabel}>
        {dominant.map((c) => riasecLabels[c]).join(' · ')}
      </Text>
    </View>
  );
};

export default RiasecHexagon;
